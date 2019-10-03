module.exports = (app, pgPool) => {
  app.post("/stripe/webhook", async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      /* Validate event & parse JSON data from Stripe.com.  */
      event = stripe.webhooks.constructEvent(
        req.body,
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

        const txData = event.data.object;
        await pgPool.query({
          text: `
						UPDATE users
						SET last_payment_at=CURRENT_TIMESTAMP
						WHERE id=$1
					`,
          values: [txData.clientReferenceId]
        });
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
