const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const { Client } = require("pg");
const client = new Client();

const hash = str =>
  crypto
    .createHmac("sha256", process.env.SHA256_SECRET)
    .update(str)
    .digest("hex");

module.exports = app => {
  app.post("/auth/signup", (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({ error: "missing-fields" });
    } else if (!validator.isEmail(email)) {
      return res.json({ error: "malformed-email" });
    } else if (!validator.isAlphanumeric(username)) {
      return res.json({ error: "malformed-username" });
    }

    const emailLower = email.toLowerCase();
    const passHash = hash(password);

    const payload = { email: emailLower, password: passHash };
    const token = jwt.sign(payload, process.env.JSON_WEB_TOKEN_SECRET);

    return res.json({ token });
  });
};
