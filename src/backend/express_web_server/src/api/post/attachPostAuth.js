const attachEndpointAuthSignUp = require("./auth/signup");
const attachEndpointAuthSignIn = require("./auth/signin");

module.exports = app => {
  /* POST /auth/signup */
  /* Register a new user. */
  /* Receives sign up form details. */
  attachEndpointAuthSignUp(app);

  /* POST /auth/signin */
  /* Authenticate an existing user. */
  /* Receives sign in form details. */
  attachEndpointAuthSignIn(app);
};
