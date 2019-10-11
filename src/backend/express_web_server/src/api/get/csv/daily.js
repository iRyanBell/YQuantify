module.exports = (app, pgPool) => {
  app.get("/csv/daily.csv", async (req, res) => {
    const result = await pgPool.query({
      text: `
				SELECT * FROM entries WHERE uid=$1
			`,
      values: [14]
    });

    return res.json({ debug: result });
  });
};
