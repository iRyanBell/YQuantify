const { static } = require("express");
const { join } = require("path");
const bodyParser = require("body-parser");

module.exports = app => {
  /* Serve static resources. */
  app.use(static(join(__dirname, "../../../../public")));

  /* Use JSON request parsing. */
  app.use(bodyParser.json());
};
