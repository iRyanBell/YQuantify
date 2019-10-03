const attachEndpointTokenDetails = require("./token/details");

module.exports = (app, pgPool) => {
  /* POST /token/details */
  /* Get token details. */
  /* Receives JWT token and returns account details. */
  attachEndpointTokenDetails(app, pgPool);
};
