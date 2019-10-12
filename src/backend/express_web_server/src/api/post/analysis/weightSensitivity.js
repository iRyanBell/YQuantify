const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports = async (app, pgPool) => {
  app.post("/analysis/weight-sensitivity", async (req, res) => {
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

      let key;

      try {
        const { rows } = await pgPool.query({
          text: `
						SELECT api_key
						FROM users
						WHERE id=$1
					`,
          values: [uid]
        });
        const [row] = rows;
        key = row.api_key;
      } catch (err) {
        return res.json({ error: "db-query", "error-details": err });
      }

      let results;

      try {
        const { data } = await axios.post(
          "http://yquantify-py:10000/weight/sensitivity",
          { key }
        );
        results = data.results;
      } catch (err) {
        return res.json({ error: "server", "error-details": err });
      }

      await pgPool.query({
        text: `
					INSERT INTO cache_analysis (uid, analysis, value)
					VALUES ($1, $2, $3)
					ON CONFLICT (uid,analysis) DO UPDATE
						SET value = $3
				`,
        values: [uid, "weight_sensitivity", valueFloat]
      });

      return res.json({ results });
    } else {
      return res.json({ error: "unauthorized" });
    }
  });
};
