const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const pg = require("pg");

const hash = str =>
  crypto
    .createHmac("sha256", process.env.SHA256_SECRET)
    .update(str)
    .digest("hex");

module.exports = app => {
  app.post("/auth/signup", (req, res) => {
    const { username, email, password } = req.body;

    if (!email || !password) {
      return res.json({ error: "missing-fields" });
    } else if (!validator.isEmail(email)) {
      return res.json({ error: "malformed-email" });
    } else if (!validator.isAlphanumeric(username)) {
      return res.json({ error: "malformed-username" });
    }

    const emailLower = email.toLowerCase();
    const passHash = hash(password);

    pg.connect(
      process.env.POSTGRE_INTERNAL_CONNECTION,
      async (err, client, done) => {
        if (err) {
          return res.json({ error: "db-connection" });
        }

        try {
          const result = await client.query(query);
          return res.json({ result });
        } catch (err) {
          return res.json({ error: "db-query" });
        }

        // client.query(
        //   "INSERT into users (email, password) VALUES($1, $2) RETURNING id",
        //   [emailLower, passHash],
        //   err => {
        //     done();

        //     if (err) {
        //       return res.json({ error: "db-query" });
        //     }

        //     const uid = result.rows[0].number;
        //     const payload = { uid, action: "activate" };
        //     const token = jwt.sign(payload, process.env.JSON_WEB_TOKEN_SECRET);

        //     return res.json({ token });
        //   }
        // );
      }
    );
  });
};
