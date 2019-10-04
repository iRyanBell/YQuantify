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
      case "invoice.payment_succeeded": {
        /* We received a payment! */
        /* Reference: https://stripe.com/docs/billing/lifecycle */

        const { customer, amount_remaining } = event.data.object;
        if (amount_remaining === 0) {
          await pgPool.query({
            text: `
							UPDATE users
							SET last_payment_at=CURRENT_TIMESTAMP
							WHERE stripe_customer_id=$1
						`,
            values: [customer]
          });
        }
        return res.json({ received: true });
      }
      case "invoice.payment_failed": {
        /* Payment failed (bad card). */
        /* Reference: https://stripe.com/docs/billing/migration/invoice-states */

        // const txData = event.data.object;
        return res.json({ received: true });
      }
      case "checkout.session.completed": {
        /* We have a new customer. */
        /* Reference: https://stripe.com/docs/payments/checkout/fulfillment */

        const { customer, subscription, clientReferenceId } = event.data.object;

        await pgPool.query({
          text: `
						UPDATE users
						SET stripe_customer_id=$1,
								stripe_subscription_id=$2
						WHERE id=$3
					`,
          values: [customer, subscription, clientReferenceId]
        });

        return res.json({ received: true });
      }
      case "customer.subscription.updated": {
        /* The subscription status has updated (update next payment date). */
        /* Reference: https://stripe.com/docs/payments/checkout/fulfillment */

        const { current_period_end, clientReferenceId } = event.data.object;
        const nextPaymentDue = moment(current_period_end * 1000).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        await pgPool.query({
          text: `
						UPDATE users
						SET next_payment_due_at=$1
						WHERE id=$2
					`,
          values: [nextPaymentDue, clientReferenceId]
        });

        return res.json({ received: true });
      }
      default: {
        return res.status(400).end();
      }
    }
  });
};
