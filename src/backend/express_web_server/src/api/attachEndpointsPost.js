const attachPostAuth = require("./post/attachPostAuth");
const attachPostStripe = require("./post/attachPostStripe");
const attachPostToken = require("./post/attachPostToken");

module.exports = (app, pgPool) => {
  /* POST /auth/... */
  attachPostAuth(app, pgPool);

  /* POST /stripe/... */
  attachPostStripe(app, pgPool);

  /* POST /tooken/... */
  attachPostToken(app, pgPool);
};
