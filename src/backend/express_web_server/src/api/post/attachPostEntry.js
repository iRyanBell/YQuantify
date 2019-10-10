const attachEndpointEntryAdd = require("./entry/add");
const attachEndpointEntryRemove = require("./entry/remove");

module.exports = (app, pgPool) => {
  /* POST /entry/add */
  /* Add a new entry */
  /* Receives feature & value. */
  attachEndpointEntryAdd(app, pgPool);

  /* POST /entry/remove */
  /* Remove a new entry */
  /* Receives feature & id. */
  attachEndpointEntryRemove(app, pgPool);
};
