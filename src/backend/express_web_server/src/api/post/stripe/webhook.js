const stripe = require("stripe")(process.env.STRIPE_SIGNING_SECRET);

module.exports = (app, pgPool) => {
  app.post("/stripe/webhook", async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      /* Validate event & parse JSON data from Stripe.com.  */
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_SECRET
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }

    /* Stripe webhooks. */
    switch (event.type) {
      case "invoice.payment_succeeded":
        /* We received a payment! */
        /* Reference: https://stripe.com/docs/billing/lifecycle */

        const {
          customer,
          subscription,
          clientReferenceId,
          amount_remaining
        } = event.data.object;
        if (amount_remaining === 0) {
          await pgPool.query({
            text: `
							UPDATE users
							SET last_payment_at=CURRENT_TIMESTAMP,
									stripe_customer_id=$1,
									stripe_subscription_id=$2
							WHERE id=$3
						`,
            values: [customer, subscription, clientReferenceId]
          });
        }
        return res.json({ received: true });
      case "invoice.payment_failed":
        /* Payment failed (bad card). */
        /* Reference: https://stripe.com/docs/billing/migration/invoice-states */

        // const txData = event.data.object;
        return res.json({ received: true });
      default:
        return res.status(400).end();
    }
  });
};
