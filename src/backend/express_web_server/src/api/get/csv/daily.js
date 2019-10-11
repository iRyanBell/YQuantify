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
					SELECT e.created_at::date,
						AVG(e.value) FILTER (WHERE feature='weight') AS weight,
						AVG(e.value) FILTER (WHERE feature='sleep') AS sleep,
						AVG(e.value) FILTER (WHERE feature='calories') AS calories
					FROM entries e
					WHERE uid=$1
					GROUP BY e.created_at::date, uid
					ORDER BY e.created_at::date
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
