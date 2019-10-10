const jwt = require("jsonwebtoken");

module.exports = (app, pgPool) => {
  app.post("/entry/add", async (req, res) => {
    if (req.header.authorization.startsWith("Bearer ")) {
      const token = req.header.authorization.substring(7, req.header.length);
      try {
        const tokenDetails = jwt.verify(token);
        return res.json({ tokenDetails });
      } catch (err) {
        return res.json({ token, "error-details": err });
      }
    } else {
      return res.json({ error: "unauthorized" });
    }

    // const { feature, value } = req.body;

    // const acceptedFeatures = ["weight", "calories", "sleep", "exercise"];

    // if (!feature || !value) {
    //   return res.json({ error: "missing-fields" });
    // } else if (acceptedFeatures.indexOf(feature) === -1) {
    //   return res.json({ error: "feature-not-supported" });
    // }
  });
};
