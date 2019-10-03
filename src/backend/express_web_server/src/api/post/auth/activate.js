const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");

const hash = str =>
  crypto
    .createHmac("sha256", process.env.SHA256_SECRET)
    .update(str)
    .digest("hex");

module.exports = app => {
  app.post("/auth/activate", async (req, res) => {
    const { username, activationToken } = req.body;

    if (!username || !activationToken) {
      return res.json({ error: "missing-fields" });
    } else if (!validator.isAlphanumeric(username)) {
      return res.json({ error: "malformed-username" });
    }

    const usernameLower = username.toLowerCase();

    let uid;

    try {
      const tokenDetails = jwt.verify(
        activationToken,
        process.env.JSON_WEB_TOKEN_SECRET
      );
      uid = tokenDetails.uid;
    } catch (err) {
      return res.json({ error: "invalid-activation-key" });
    }

    try {
      const { rowCount } = await pool.query({
        text: "SELECT username FROM users WHERE username = $1",
        values: [usernameLower]
      });
      if (rowCount) {
        return res.json({ error: "username-in-use" });
      }

      await pool.query({
        text: `
					UPDATE users SET username=$1, is_activated=TRUE, last_login_at=CURRENT_TIMESTAMP
					WHERE id=$2
				`,
        values: [usernameLower, uid]
      });

      const payload = { uid, username: usernameLower, action: "signin" };
      const token = jwt.sign(payload, process.env.JSON_WEB_TOKEN_SECRET);

      return res.json({ token });
    } catch (err) {
      return res.json({ error: "db-query", "error-details": err });
    }
  });
};
