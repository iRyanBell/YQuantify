const jwt = require("jsonwebtoken");

module.exports = (app, pgPool) => {
  app.post("/entry/remove", async (req, res) => {
    if (req.headers.authorization.startsWith("Bearer ")) {
      const token = req.headers.authorization.substring(
        7,
        req.headers.authorization.length
      );
      let uid;

      try {
        const tokenDetails = jwt.verify(
          token,
          process.env.JSON_WEB_TOKEN_SECRET
        );
        uid = tokenDetails.uid;
      } catch (err) {
        return res.json({ error: "invalid-token", "error-details": err });
      }

      try {
        const { id } = req.body;

        if (!id) {
          return res.json({ error: "missing-fields" });
        }

        const idInt = parseInt(id);

        await pgPool.query({
          text: `
						DELETE FROM entries
						WHERE id=$1 AND uid=$2
					`,
          values: [idInt, uid]
        });

        return res.json({ removed: true });
      } catch (err) {
        return res.json({ error: "server", "error-details": err });
      }
    } else {
      return res.json({ error: "unauthorized" });
    }
  });
};
