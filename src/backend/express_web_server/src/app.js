const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "../../../../public")));

app.get("/server/health-check", (req, res) => {
  return res.sendStatus(200);
});

app.listen(port, () =>
  console.log(`YQuantify express server listening on port ${port}! \\o/`)
);
