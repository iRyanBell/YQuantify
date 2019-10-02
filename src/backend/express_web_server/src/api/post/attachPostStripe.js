const attachEndpointStripeWebhook = require("./stripe/webhook");

module.exports = app => {
  /* POST /stripe/webhook */
  /* Invoice & Subscriber event notifications (Called by Stripe.com) */
  /* Receives payment & customer details. */
  /* Returns { received: true } or 400 error. */
  attachEndpointStripeWebhook(app);
};
