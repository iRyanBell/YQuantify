const attachEndpointsGet = require("./api/attachEndpointsGet");
const attachEndpointsPost = require("./api/attachEndpointsPost");

module.exports = app => {
  attachEndpointsGet(app);
  attachEndpointsPost(app);
};
