const jwt = require("jsonwebtoken");

module.exports = (app, pgPool) => {
  app.post("/entry/add", async (req, res) => {
    if (req.headers.authorization.startsWith("Bearer ")) {
      const token = req.headers.authorization.substring(
        7,
        req.headers.authorization.length
      );
      let uid;

      try {
        const tokenDetails = jwt.verify(
          token,
          process.env.JSON_WEB_TOKEN_SECRET
        );
        uid = tokenDetails.uid;
      } catch (err) {
        return res.json({ error: "invalid-token" });
      }

      const { feature, value } = req.body;
      const acceptedFeatures = ["weight", "calories", "sleep", "exercise"];

      if (!feature || !value || !timestamp) {
        return res.json({ error: "missing-fields" });
      } else if (acceptedFeatures.indexOf(feature) === -1) {
        return res.json({ error: "feature-not-supported" });
      }

      try {
        const timestampDate = new Date(timestamp);
        const valueFloat = parseFloat(value);

        const text = `
						INSERT INTO entries (uid, feature, value, created_at)
						VALUES ($1, $2, $3, $4)
						RETURNING id
					`;
        const values = [uid, feature, valueFloat, timestampDate];

        const { rows } = await pgPool.query({
          text,
          values
        });
        const [row] = rows;
        const { id } = row;

        return res.json({ added: true, id });
      } catch (err) {
        return res.json({ error: "invalid-token", "error-details": err });
      }
    } else {
      return res.json({ error: "unauthorized" });
    }
  });
};
