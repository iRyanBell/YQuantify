const { static } = require("express");
const { join } = require("path");
const bodyParser = require("body-parser");

module.exports = app => {
  /* Serve static resources. */
  app.use(static(join(__dirname, "../../../../public")));

  /* Add rawBody (used for Stripe webhook signature verification) */
  app.use((req, res, next) => {
    let data_stream = "";

    req
      .setEncoding("utf-8")
      .on("data", data => {
        data_stream += data;
      })
      .on("end", () => {
        req.rawBody;
        req.rawBody = data_stream;
        next();
      });
  });

  /* Use JSON request parsing. */
  app.use(bodyParser.json());
};
