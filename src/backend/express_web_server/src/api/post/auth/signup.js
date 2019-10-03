const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING_YQDB
});

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
      const { rowCount } = await pool.query({
        text: "SELECT email FROM users WHERE email = $1",
        values: [emailLower]
      });
      if (rowCount) {
        return res.json({ error: "email-in-use" });
      }

      const { rows } = await pool.query({
        text: "INSERT INTO users (email, password) VALUES ($1, $2) RETURN id",
        values: [emailLower, passHash]
      });
      const [uidVal] = rows;
      const uid = uidVal.number;

      const payload = { uid, action: "activate" };
      const token = jwt.sign(payload, process.env.JSON_WEB_TOKEN_SECRET);

      return res.json({ token });
    } catch (err) {
      return res.json({ error: "db-query", "error-details": err });
    }
  });
};
