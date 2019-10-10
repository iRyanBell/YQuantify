const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = (app, pgPool) => {
  app.post("/entry/add", async (req, res) => {
    const { feature, value } = req.body;

    const acceptedFeatures = ["weight", "calories", "sleep", "exercise"];

    if (!feature || !value) {
      return res.json({ error: "missing-fields" });
    } else if (acceptedFeatures.indexOf(feature) === -1) {
      return res.json({ error: "feature-not-supported" });
    }
  });
};
