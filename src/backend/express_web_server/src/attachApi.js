const attachApiGetServerHealth = require("./get/server/health");
const attachApiPostAuthSignUp = require("./post/auth/signup");
const attachApiPostAuthSignIn = require("./post/auth/signin");
const attachApiPostStripeWebhook = require("./post/stripe/webhook");

module.defaults = app => {
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
