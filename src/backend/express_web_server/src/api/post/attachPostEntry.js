const attachEndpointEntryAdd = require("./entry/add");

module.exports = (app, pgPool) => {
  /* POST /entry/add */
  /* Add a new entry */
  /* Receives feature & value. */
  attachEndpointEntryAdd(app, pgPool);
};
