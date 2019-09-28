const express = require("express");
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
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        return response.status(400).end();
    }

    response.json({ received: true });
  }
);

app.listen(port, () =>
  console.log(`YQuantify express server listening on port ${port}! \\o/`)
);
