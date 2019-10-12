const attachPostAuth = require("./post/attachPostAuth");
const attachPostStripe = require("./post/attachPostStripe");
const attachPostToken = require("./post/attachPostToken");
const attachPostEntry = require("./post/attachPostEntry");
const attachPostAnalysis = require("./post/attachPostAnalysis");

module.exports = (app, pgPool) => {
  /* POST /auth/... */
  attachPostAuth(app, pgPool);

  /* POST /stripe/... */
  attachPostStripe(app, pgPool);

  /* POST /token/... */
  attachPostToken(app, pgPool);

  /* POST /entry/... */
  attachPostEntry(app, pgPool);

  /* POST /analysis/... */
  attachPostAnalysis(app, pgPool);
};
