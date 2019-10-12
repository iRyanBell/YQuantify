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
        const { api_key: key } = row;

        axios
          .post("http:/yquantify-py:10000/weight/sensitivity", { key })
          .then(res => {
            return res.json(res);
          })
          .catch(err => {
            return res.json({ error: "server", "error-details": err });
          });
      } catch (err) {
        return res.json({ error: "db-query", "error-details": err });
      }
    } else {
      return res.json({ error: "unauthorized" });
    }

    if (!token) {
      return res.json({ error: "missing-fields" });
    }
  });
};
