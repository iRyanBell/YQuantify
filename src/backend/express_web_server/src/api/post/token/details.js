const jwt = require("jsonwebtoken");

module.exports = async (app, pgPool) => {
  app.post("/token/details", async (req, res) => {
    const { token } = req.body;

    if (!token) {
      return res.json({ error: "missing-fields" });
    }

    let uid;

    try {
      const tokenDetails = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
      uid = tokenDetails.uid;
    } catch (err) {
      return res.json({ error: "invalid-token" });
    }

    try {
      const { rows } = await pgPool.query({
        text: `
					SELECT username, email, api_key
					FROM users
					WHERE id=$1
				`,
        values: [uid]
      });
      const [row] = rows;
      const { username, api_key: apiKey } = row;

      return res.json({ uid, username, apiKey });
    } catch (err) {
      return res.json({ error: "db-query", "error-details": err });
    }
  });
};
