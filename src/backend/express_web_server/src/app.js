const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "../../../../public")));

app.get("/server/health-check", (req, res) => {
  return res.sendStatus(200);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../../public/index.html"));
});

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

app.listen(port, () =>
  console.log(`YQuantify express server listening on port ${port}! \\o/`)
);
