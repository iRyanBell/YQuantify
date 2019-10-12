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
        const { analysis } = req.body;
        const acceptedAnalysis = ["weight_sensitivity"];

        if (!analysis) {
          return res.json({ error: "missing-fields" });
        } else if (acceptedAnalysis.indexOf(feature) === -1) {
          return res.json({ error: "analysis-not-supported" });
        }

        const { rows } = await pgPool.query({
          text: `
					SELECT value
					FROM cache_analysis
					WHERE id=$1
				`,
          values: [`${uid}:${analysis}`]
        });
        const [row] = rows;
        const result = rows.value;

        return res.json({ results });
      } catch (err) {
        return res.json({
          error: "invalid-token",
          "error-details": err
        });
      }
    } else {
      return res.json({ error: "unauthorized" });
    }
  });
};
