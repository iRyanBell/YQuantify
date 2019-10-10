const jwt = require("jsonwebtoken");

module.exports = (app, pgPool) => {
  app.post("/entry/remove", async (req, res) => {
    if (req.headers.authorization.startsWith("Bearer ")) {
      const token = req.headers.authorization.substring(
        7,
        req.headers.authorization.length
      );
      try {
        const tokenDetails = jwt.verify(token);
        return res.json({ tokenDetails });
      } catch (err) {
        return res.json({ error: "invalid-token", "error-details": err });
      }
    } else {
      return res.json({ error: "unauthorized" });
    }

    // const { feature, id } = req.body;

    // const acceptedFeatures = ["weight", "calories", "sleep", "exercise"];

    // if (!feature || !value) {
    //   return res.json({ error: "missing-fields" });
    // } else if (acceptedFeatures.indexOf(feature) === -1) {
    //   return res.json({ error: "feature-not-supported" });
    // }
  });
};
