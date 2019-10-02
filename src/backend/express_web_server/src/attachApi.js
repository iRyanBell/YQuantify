const attachEndpointsGet = require("./api/attachEndpointsGet");
const attachEndpointsPost = require("./api/attachEndpointsPost");

module.exports = app => {
  /* GET Requests */
  attachEndpointsGet(app);

  /* POST Requests */
  attachEndpointsPost(app);
};
