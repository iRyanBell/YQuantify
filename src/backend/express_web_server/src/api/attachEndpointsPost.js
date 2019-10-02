const attachPostAuth = require("./post/attachPostAuth");
const attachPostStripe = require("./post/attachPostStripe");

module.exports = app => {
  /* POST /auth/... */
  attachPostAuth(app);

  /* POST /stripe/... */
  attachPostStripe(app);
};
