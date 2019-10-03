const express = require("express");
const { join } = require("path");
const attachMiddleware = require("./attachMiddleware");
const attachApi = require("./attachApi");
const app = express();
const port = process.env.PORT || 3001;
const { Pool } = require("pg");
const pgPool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING_YQDB
});

/* Attach API middleware. */
attachMiddleware(app);

/* Attach GET / POST endpoints. */
attachApi(app, pgPool);

/* Serve static React front-end. */
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../../../../public/index.html"));
});

/* Start server */
app.listen(port, () =>
  console.log(`YQuantify express server listening on port ${port}! \\o/`)
);
