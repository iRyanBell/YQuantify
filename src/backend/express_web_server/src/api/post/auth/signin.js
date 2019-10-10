const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const hash = str =>
  crypto
    .createHmac("sha256", process.env.SHA256_SECRET)
    .update(str)
    .digest("hex");

module.exports = (app, pgPool) => {
  app.post("/auth/signin", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ error: "missing-fields" });
    }

    const usernameLower = username.toLowerCase();
    const passHash = hash(password);

    try {
      const { rowCount, rows } = await pgPool.query({
        text: `
					SELECT id, password
					FROM users
					WHERE username=$1
				`,
        values: [usernameLower]
      });
      if (rowCount === 0) {
        return res.json({ error: "username-not-found" });
      }

      const [row] = rows;
      const { id: uid, password: dbPassHash } = row;

      if (dbPassHash !== passHash) {
        return res.json({ error: "invalid-password" });
      }

      await pgPool.query({
        text: `
					UPDATE users
					SET last_login_at=CURRENT_TIMESTAMP
					WHERE id=$1
				`,
        values: [uid]
      });

      const payload = { uid, username: usernameLower, action: "signin" };
      const token = jwt.sign(payload, process.env.JSON_WEB_TOKEN_SECRET);

      return res.json({ token });
    } catch (err) {
      return res.json({ error: "db-query", "error-details": err });
    }
  });
};
