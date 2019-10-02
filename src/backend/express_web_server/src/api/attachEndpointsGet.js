const attachGetServer = require("./get/attachGetServer");

module.exports = app => {
  /* GET /server/... */
  attachGetServer(app);
};
