const jwt = require("jsonwebtoken");

module.exports = (app, pgPool) => {
  app.get("/csv/daily.csv", async (req, res) => {
    const uid = 14;
    const csv = "1,2,3";
    res.setHeader("Content-disposition", "attachment; filename=daily.csv");
    res.set("Content-Type", "text/csv");
    return res.status(200).send(csv);
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
