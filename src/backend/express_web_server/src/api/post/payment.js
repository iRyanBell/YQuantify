const bodyParser = require("body-parser");

module.defaults = app => {
  app.post(
    "/payment",
    bodyParser.raw({ type: "application/json" }),
    (request, response) => {
      let event;

      try {
        event = JSON.parse(request.body);
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
      }

      switch (event.type) {
        case "invoice.payment_succeeded":
          // const paymentData = event.data.object;
          return response.json({ received: true });
        case "invoice.payment_action_required":
          // const paymentData = event.data.object;
          return response.json({ received: true });
        case "invoice.payment_failed":
          // const paymentData = event.data.object;
          return response.json({ received: true });
        case "customer.subscription.created":
          // const paymentData = event.data.object;
          return response.json({ received: true });
        case "customer.subscription.updated":
          // const paymentData = event.data.object;
          return response.json({ received: true });
        case "customer.subscription.trial_will_end":
          // const paymentData = event.data.object;
          return response.json({ received: true });
        case "customer.subscription.deleted":
          // const paymentData = event.data.object;
          return response.json({ received: true });
        default:
          return response.status(400).end();
      }
    }
  );
};
