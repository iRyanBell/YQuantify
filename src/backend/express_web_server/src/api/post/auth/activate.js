const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");

const hash = str =>
  crypto
    .createHmac("sha256", process.env.SHA256_SECRET)
    .update(str)
    .digest("hex");

module.exports = app => {
  app.post("/auth/activate", (req, res) => {
    const { username, activationToken } = req.body;

    if (!username || !activationToken) {
      return res.json({ error: "missing-fields" });
    } else if (!validator.isAlphanumeric(email)) {
      return res.json({ error: "malformed-username" });
    }

    try {
      const tokenDetails = jwt.verify(
        activationToken,
        process.env.JSON_WEB_TOKEN_SECRET
      );
      return res.json({ tokenDetails });
    } catch (err) {
      return res.json({ error: "invalid-activation-key" });
    }
  });
};
