const jwt = require("jsonwebtoken");
const validator = require("validator");
const postmark = require("postmark");
const pmClient = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

module.exports = (app, pgPool) => {
  app.post("/auth/forgot", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.json({ error: "missing-fields" });
    } else if (!validator.isEmail(email)) {
      return res.json({ error: "malformed-email" });
    }

    const emailLower = email.toLowerCase();

    try {
      const { rowCount, rows } = await pgPool.query({
        text: `
					SELECT email, uid
					FROM users
					WHERE email = $1
				`,
        values: [emailLower]
      });
      if (!rowCount) {
        return res.json({ error: "email-not-found" });
      }

      const [row] = rows;
      const { id: uid } = row;

      const payload = { uid, action: "reset" };
      const token = jwt.sign(payload, process.env.JSON_WEB_TOKEN_SECRET);

      pmClient.sendEmailWithTemplate({
        From: "no-reply@yquantify.com",
        To: email,
        TemplateAlias: "forgot",
        TemplateModel: {
          reset_url: `https://www.yquantify.com/reset/${token}`,
          support_email: "support@yquantify.com",
          product_name: "YQuantify",
          help_url: "https://www.yquantify.com/docs"
        }
      });

      return res.json({ sent: true });
    } catch (err) {
      return res.json({ error: "db-query", "error-details": err });
    }
  });
};
