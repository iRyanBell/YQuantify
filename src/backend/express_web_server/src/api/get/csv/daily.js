const jwt = require("jsonwebtoken");

module.exports = (app, pgPool) => {
  app.post("/csv/daily", async (req, res) => {
    if (req.headers.authorization.startsWith("Bearer ")) {
      const token = req.headers.authorization.substring(
        7,
        req.headers.authorization.length
      );
      try {
        const tokenDetails = jwt.verify(
          token,
          process.env.JSON_WEB_TOKEN_SECRET
        );

        return res.json({ success: true });
      } catch (err) {
        return res.json({
          error: "invalid-token",
          "error-details": err
        });
      }
    } else {
      return res.json({ error: "unauthorized" });
    }
  });
};
