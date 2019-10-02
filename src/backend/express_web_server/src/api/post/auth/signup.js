const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const { Pool } = require("pg");
const pool = new Pool();

const hash = str =>
  crypto
    .createHmac("sha256", process.env.SHA256_SECRET)
    .update(str)
    .digest("hex");

module.exports = app => {
  app.post("/auth/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!email || !password) {
      return res.json({ error: "missing-fields" });
    } else if (!validator.isEmail(email)) {
      return res.json({ error: "malformed-email" });
    }

    const emailLower = email.toLowerCase();
    const passHash = hash(password);

    try {
      const result = await pool.query({
        text: "SELECT email FROM users WHERE email = $1",
        values: [emailLower]
      });
      await pool.end();

      return res.json({ result });
    } catch (err) {
      await pool.end();
      return res.json({ error: "db-query" });
    }
  });
};
