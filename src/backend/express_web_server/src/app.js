const express = require("express");
const path = require("path");
const app = express();
const attachApi = require("./attachApi");
const port = process.env.PORT || 3001;

/* Attach GET / POST endpoints. */
attachApi(app);

/* Serve static React front-end. */
app.use(express.static(path.join(__dirname, "../../../../public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../../public/index.html"));
});

/* Start server */
app.listen(port, () =>
  console.log(`YQuantify express server listening on port ${port}! \\o/`)
);
