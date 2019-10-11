const attachGetServer = require("./get/attachGetServer");
const attachGetCsv = require("./get/attachGetCsv");

module.exports = app => {
  /* GET /server/... */
  attachGetServer(app);

  /* GET /csv/... */
  attachGetCsv(app);
};
