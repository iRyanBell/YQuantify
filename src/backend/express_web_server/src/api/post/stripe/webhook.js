const bodyParser = require("body-parser");

module.exports = app => {
  app.post(
    "/payment",
    bodyParser.raw({ type: "application/json" }),
    (req, res) => {
      let event;

      /* Parse JSON data from Stripe.com.  */
      try {
        event = JSON.parse(req.body);
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
      }

      /* Stripe webhooks. */
      switch (event.type) {
        case "invoice.payment_succeeded":
          /* We received a payment! */
          /* Reference: https://stripe.com/docs/billing/lifecycle */

          // const paymentData = event.data.object;
          return res.json({ received: true });
        case "invoice.payment_action_required":
          /* Regulations in Europe often require 3D Secure. */
          /* Reference: https://stripe.com/docs/billing/subscriptions/payment#handling-action-required */

          // const paymentData = event.data.object;
          return res.json({ received: true });
        case "invoice.payment_failed":
          /* Payment failed (bad card). */
          /* Reference: https://stripe.com/docs/billing/migration/invoice-states */

          // const paymentData = event.data.object;
          return res.json({ received: true });
        case "customer.subscription.created":
          /* A new customer has signed up, but hasn't paid. */
          /* Reference: https://stripe.com/docs/billing/lifecycle */

          // const paymentData = event.data.object;
          return res.json({ received: true });
        case "customer.subscription.updated":
          /* A customer subscription status has changed (failure to pay on time). */
          /* Reference: https://stripe.com/docs/billing/lifecycle */

          // const paymentData = event.data.object;
          return res.json({ received: true });
        case "customer.subscription.trial_will_end":
          /* A trial subscription is about to end. */
          /* Reference: https://stripe.com/docs/billing/lifecycle */

          // const paymentData = event.data.object;
          return res.json({ received: true });
        case "customer.subscription.deleted":
          /* We lost a customer. */
          /* Reference: https://stripe.com/docs/billing/lifecycle */

          // const paymentData = event.data.object;
          return res.json({ received: true });
        default:
          return res.status(400).end();
      }
    }
  );
};
