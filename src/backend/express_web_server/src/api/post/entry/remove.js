const jwt = require("jsonwebtoken");

module.exports = (app, pgPool) => {
  app.post("/entry/add", async (req, res) => {
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
        const uid = tokenDetails.uid;
        const { id } = req.body;

        if (!id) {
          return res.json({ error: "missing-fields" });
        }

        const idInt = parseInt(id);

        const { rows } = await pgPool.query({
          text: `
						SELECT uid
						FROM entries
						WHERE id = $1
					`,
          values: [idInt]
        });
        if (!rowCount) {
          return res.json({ error: "id-not-found" });
        }

        const [row] = rows;
        const { uid: uidValidate } = row;

        if (uid !== uidValidate) {
          return res.json({ error: "unauthorized" });
        }

        await pgPool.query({
          text: `
						DELETE FROM entries
						WHERE id=$1
					`,
          values: [id]
        });

        return res.json({ removed: true });
      } catch (err) {
        return res.json({ error: "invalid-token", "error-details": err });
      }
    } else {
      return res.json({ error: "unauthorized" });
    }
  });
};
