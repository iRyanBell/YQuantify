const jwt = require("jsonwebtoken");
const validator = require("validator");

module.exports = (app, pgPool) => {
  app.post("/auth/activate", async (req, res) => {
    const { username, token } = req.body;

    if (!username || !token) {
      return res.json({ error: "missing-fields" });
    } else if (!validator.isAlphanumeric(username)) {
      return res.json({ error: "malformed-username" });
    }

    const usernameLower = username.toLowerCase();

    let uid;

    try {
      const tokenDetails = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
      uid = tokenDetails.uid;
    } catch (err) {
      return res.json({ error: "invalid-token" });
    }

    try {
      const { rowCount } = await pgPool.query({
        text: `
					SELECT username
					FROM users
					WHERE username = $1
				`,
        values: [usernameLower]
      });
      if (rowCount) {
        return res.json({ error: "username-in-use" });
      }

      await pgPool.query({
        text: `
					UPDATE users
					SET username=$1,
							is_activated=TRUE,
							last_login_at=CURRENT_TIMESTAMP
					WHERE id=$2 AND is_activated=FALSE
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
