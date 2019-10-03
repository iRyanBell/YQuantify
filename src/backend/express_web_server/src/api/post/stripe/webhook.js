module.exports = (app, pgPool) => {
  app.post("/payment", async (req, res) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      /* Validate event & parse JSON data from Stripe.com.  */
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        process.env.STRIPE_SECRET
      );
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
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
          values: [txData.sessionId]
        });
        return res.json({ received: true });
      case "invoice.payment_action_required":
        /* Regulations in Europe often require 3D Secure. */
        /* Reference: https://stripe.com/docs/billing/subscriptions/payment#handling-action-required */

        // const txData = event.data.object;
        return res.json({ received: true });
      case "invoice.payment_failed":
        /* Payment failed (bad card). */
        /* Reference: https://stripe.com/docs/billing/migration/invoice-states */

        // const txData = event.data.object;
        return res.json({ received: true });
      case "customer.subscription.created":
        /* A new customer has signed up, but hasn't paid. */
        /* Reference: https://stripe.com/docs/billing/lifecycle */

        // const txData = event.data.object;
        return res.json({ received: true });
      case "customer.subscription.updated":
        /* A customer subscription status has changed (failure to pay on time). */
        /* Reference: https://stripe.com/docs/billing/lifecycle */

        // const txData = event.data.object;
        return res.json({ received: true });
      case "customer.subscription.trial_will_end":
        /* A trial subscription is about to end. */
        /* Reference: https://stripe.com/docs/billing/lifecycle */

        // const txData = event.data.object;
        return res.json({ received: true });
      case "customer.subscription.deleted":
        /* We lost a customer. */
        /* Reference: https://stripe.com/docs/billing/lifecycle */

        // const txData = event.data.object;
        return res.json({ received: true });
      default:
        return res.status(400).end();
    }
  });
};
