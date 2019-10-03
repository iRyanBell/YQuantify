const attachEndpointStripeWebhook = require("./stripe/webhook");

module.exports = (app, pgPool) => {
  /* POST /stripe/webhook */
  /* Invoice & Subscriber event notifications (Called by Stripe.com) */
  /* Receives payment & customer details. */
  /* Returns { received: true } or 400 error. */
  attachEndpointStripeWebhook(app, pgPool);
};
