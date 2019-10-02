const attachApiGetServerHealth = require("./api/get/server/health");
const attachApiPostAuthSignUp = require("./api/post/auth/signup");
const attachApiPostAuthSignIn = require("./api/post/auth/signin");
const attachApiPostStripeWebhook = require("./api/post/stripe/webhook");

module.exports = app => {
  /* GET /server/health */
  /* Check server health (Called by Render.com) /*
	/* Returns 200. */
  attachApiGetServerHealth(app);

  /* POST /auth/signup */
  /* Register a new user. */
  /* Receives sign up form details. */
  attachApiPostAuthSignUp(app);

  /* POST /auth/signin */
  /* Authenticate an existing user. */
  /* Receives sign in form details. */
  attachApiPostAuthSignIn(app);

  /* POST /stripe/webhook */
  /* Invoice & Subscriber event notifications (Called by Stripe.com) */
  /* Receives payment & customer details. */
  /* Returns { received: true } or 400 error. */
  attachApiPostStripeWebhook(app);
};
