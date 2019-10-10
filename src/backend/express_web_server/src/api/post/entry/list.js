const jwt = require("jsonwebtoken");

module.exports = (app, pgPool) => {
  app.post("/entry/list", async (req, res) => {
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
        const { feature, page, perPage } = req.body;
        const acceptedFeatures = ["weight", "calories", "sleep", "exercise"];

        if (!feature || !page || !perPage) {
          return res.json({ error: "missing-fields" });
        } else if (acceptedFeatures.indexOf(feature) === -1) {
          return res.json({ error: "feature-not-supported" });
        }

        const offsetInt = (parseInt(page) - 1) * parseInt(perPage);
        const limitInt = Math.min(
          1000,
          offsetInt + parseInt(perPage)
        ); /* Max: 1,000 per page */

        const { rows } = await pgPool.query({
          text: `
						SELECT id, created_at, feature, value
						FROM entries
						WHERE uid = $1
						ORDER BY created_at DESC
						LIMIT $2
						OFFSET $3
					`,
          values: [uid, limitInt, offsetInt]
        });

        return res.json({ results: rows });
      } catch (err) {
        return res.json({ error: "invalid-token", "error-details": err });
      }
    } else {
      return res.json({ error: "unauthorized" });
    }
  });
};
