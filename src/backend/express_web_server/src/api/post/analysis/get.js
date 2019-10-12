const jwt = require("jsonwebtoken");

module.exports = (app, pgPool) => {
  app.post("/analysis/get", async (req, res) => {
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

      const { analysis } = req.body;
      const acceptedAnalysis = ["weight_sensitivity"];

      if (!analysis) {
        return res.json({ error: "missing-fields" });
      } else if (acceptedAnalysis.indexOf(feature) === -1) {
        return res.json({ error: "analysis-not-supported" });
      }

      let resultsVal;

      try {
        const { rows } = await pgPool.query({
          text: `
						SELECT value
						FROM cache_analysis
						WHERE id=$1
					`,
          values: [`${uid}:${analysis}`]
        });
        const [row] = rows;
        resultsVal = row.value;
      } catch (err) {
        return res.json({ error: "server", "error-details": err });
      }

      try {
        const results = JSON.parse(resultsVal);
        return res.json({ results });
      } catch (err) {
        return res.json({ error: "server", "error-details": err });
      }
    }
    return res.json({ error: "unauthorized" });
  });
};
