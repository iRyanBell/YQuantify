const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const hash = str =>
  crypto
    .createHmac("sha256", process.env.SHA256_SECRET)
    .update(str)
    .digest("hex");

module.exports = (app, pgPool) => {
  app.post("/auth/reset", async (req, res) => {
    const { password, token } = req.body;

    if (!password || !token) {
      return res.json({ error: "missing-fields" });
    }

    const passHash = hash(password);
    let uid;

    try {
      const tokenDetails = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
      uid = tokenDetails.uid;
    } catch (err) {
      return res.json({ error: "invalid-token" });
    }

    try {
      await pgPool.query({
        text: `
					UPDATE users
					SET password=$1
					WHERE id=$2
				`,
        values: [passHash, uid]
      });

      return res.json({ updated: true });
    } catch (err) {
      return res.json({ error: "db-query", "error-details": err });
    }
  });
};
