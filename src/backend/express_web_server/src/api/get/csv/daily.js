const jwt = require("jsonwebtoken");
const { Parser } = require("json2csv");

module.exports = (app, pgPool) => {
  app.get("/csv/daily.csv", async (req, res) => {
    const uid = 14;
    const csv = "1,2,3";

    const { rows } = await pgPool.query({
      text: `
				SELECT e.created_at::date,
					AVG(e.value) FILTER (WHERE feature = 'weight') AS weight,
					AVG(e.value) FILTER (WHERE feature = 'sleep') AS sleep,
					AVG(e.value) FILTER (WHERE feature = 'calories') AS calories
				FROM entries e
				where uid = $1
				GROUP BY e.created_at::date, uid
				ORDER BY e.created_at::date
			`,
      values: [uid]
    });

    res.setHeader("Content-disposition", "attachment; filename=daily.csv");
    res.set("Content-Type", "text/csv");

    const fields = ["created_at", "weight", "sleep", "calories"];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(myData);

    return res.status(200).send(rows);
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
