const attachEndpointAuthSignUp = require("./auth/signup");
const attachEndpointAuthSignIn = require("./auth/signin");
const attachEndpointAuthActivate = require("./auth/activate");
const attachEndpointAuthForgot = require("./auth/forgot");
const attachEndpointAuthReset = require("./auth/reset");

module.exports = (app, pgPool) => {
  /* POST /auth/signup */
  /* Register a new user. */
  /* Receives sign up form details. */
  attachEndpointAuthSignUp(app, pgPool);

  /* POST /auth/signin */
  /* Authenticate an existing user. */
  /* Receives sign in form details. */
  attachEndpointAuthSignIn(app, pgPool);

  /* POST /auth/activate */
  /* Activate a new user (confirm email) & registers username. */
  /* Receives JWT & username. Referenced by Welcome email: Activate & Upgrade */
  attachEndpointAuthActivate(app, pgPool);

  /* POST /auth/forgot */
  /* Send a reset password link. */
  /* Receives email address. Referenced by SignIn dialog. */
  attachEndpointAuthForgot(app, pgPool);

  /* POST /auth/reset */
  /* Update a user's password. */
  /* Receives a reset token. Referenced by Reset email. */
  attachEndpointAuthReset(app, pgPool);
};
