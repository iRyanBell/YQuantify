const attachPostAuth = require("./post/attachPostAuth");
const attachPostStripe = require("./post/attachPostStripe");

module.exports = (app, pgPool) => {
  /* POST /auth/... */
  attachPostAuth(app, pgPool);

  /* POST /stripe/... */
  attachPostStripe(app, pgPool);
};
