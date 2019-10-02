const jwt = require("jsonwebtoken");

module.exports = app => {
  app.post("/auth/signup", (req, res) => {
    if (!email || !password) {
      return res.json({ error: "missing-fields" });
    }

    // process.env.JSON_WEB_TOKEN_SECRET

    const { email, password } = req.body;
    return res.json({ email, password });
  });
};
