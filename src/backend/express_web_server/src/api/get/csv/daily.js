const { Parser } = require("json2csv");

module.exports = (app, pgPool) => {
  app.get("/csv/daily.csv", async (req, res) => {
    const apiKey = req.query.key;
    let uid;
    if (!apiKey) {
      return res.json({ error: "unauthorized" });
    }

    try {
      const { rows, rowCount } = await pgPool.query({
        text: `
					SELECT id, api_key
					FROM users
					WHERE api_key=$1
				`,
        values: [apiKey]
      });

      if (rowCount === 0) {
        return res.json({ error: "unauthorized" });
      }

      const [row] = rows;
      uid = row.id;
    } catch (err) {
      return res.json({ error: "db-query", "error-details": err });
    }

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
      rows = result.rows;
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
  });
};
