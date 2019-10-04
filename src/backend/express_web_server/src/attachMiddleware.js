const { static } = require("express");
const { join } = require("path");
const bodyParser = require("body-parser");

module.exports = app => {
  /* Serve static resources. */
  app.use(static(join(__dirname, "../../../../public")));

  /* Add JSON parsing + rawBody (used for Stripe webhook signature verification) */
  app.use(
    bodyParser.json({
      verify: (req, res, buf, encoding) => {
        req.rawBody = buf.toString(encoding || "utf8");
      }
    })
  );
};
