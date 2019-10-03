const attachEndpointsGet = require("./api/attachEndpointsGet");
const attachEndpointsPost = require("./api/attachEndpointsPost");

module.exports = (app, pgPool) => {
  /* GET Requests */
  attachEndpointsGet(app, pgPool);

  /* POST Requests */
  attachEndpointsPost(app, pgPool);
};
