const jwt = require("jsonwebtoken");
const { Parser } = require("json2csv");

module.exports = (app, pgPool) => {
  app.get("/csv/daily.csv", async (req, res) => {
    const uid = 14;
    let rows = [];
    let csv;

    try {
      const result = await pgPool.query({
        text: `
					SELECT * WHERE uid=$1
				`,
        values: [uid]
      });
      return res.json({ debug: result });
      // rows = result.rows;
    } catch (err) {
      return res.json({ error: "db-query", "error-details": err });
    }

    try {
      const fields = ["created_at", "weight", "sleep", "calories"];
      const opts = { fields };
      const parser = new Parser(opts);

      csv = parser.parse(rows);
    } catch (err) {
      return res.json({ error: "server", "error-details": err });
    }

    res.setHeader("Content-disposition", "attachment; filename=daily.csv");
    res.set("Content-Type", "text/csv");

    return res.send(csv);
    // if (req.headers.authorization.startsWith("Bearer ")) {
    //   const token = req.headers.authorization.substring(
    //     7,
    //     req.headers.authorization.length
    //   );
    //   try {
    //     const tokenDetails = jwt.verify(
    //       token,
    //       process.env.JSON_WEB_TOKEN_SECRET
    //     );

    //     return res.json({ success: true });
    //   } catch (err) {
    //     return res.json({
    //       error: "invalid-token",
    //       "error-details": err
    //     });
    //   }
    // } else {
    //   return res.json({ error: "unauthorized" });
    // }
  });
};
