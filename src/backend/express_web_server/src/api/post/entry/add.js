const jwt = require("jsonwebtoken");
const moment = require("moment");

module.exports = (app, pgPool) => {
  app.post("/entry/add", async (req, res) => {
    if (req.headers.authorization.startsWith("Bearer ")) {
      const token = req.headers.authorization.substring(
        7,
        req.headers.authorization.length
      );
      try {
        const tokenDetails = jwt.verify(
          token,
          process.env.JSON_WEB_TOKEN_SECRET
        );
        const uid = tokenDetails.uid;
        const { feature, value } = req.body;
        const acceptedFeatures = ["weight", "calories", "sleep", "exercise"];

        if (!feature || !value || !timestamp) {
          return res.json({ error: "missing-fields" });
        } else if (acceptedFeatures.indexOf(feature) === -1) {
          return res.json({ error: "feature-not-supported" });
        }

        const timestampFormatted = moment(timestamp).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        const valueFloat = parseFloat(value);

        await pgPool.query({
          text: `
						INSERT INTO entries (uid, feature, value, timestamp)
						VALUES ($1, $2, $3, $4)
						RETURNING id
					`,
          values: [uid, feature, valueFloat, timestampFormatted]
        });

        return res.json({ added: true });
      } catch (err) {
        return res.json({ error: "invalid-token", "error-details": err });
      }
    } else {
      return res.json({ error: "unauthorized" });
    }
  });
};
