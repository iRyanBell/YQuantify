const attachEndpointEntryAdd = require("./entry/add");
const attachEndpointEntryRemove = require("./entry/remove");
const attachEndpointEntryGet = require("./entry/get");

module.exports = (app, pgPool) => {
  /* POST /entry/add */
  /* Add a new entry */
  /* Receives feature & value. */
  attachEndpointEntryAdd(app, pgPool);

  /* POST /entry/remove */
  /* Remove a new entry */
  /* Receives a feature id. */
  attachEndpointEntryRemove(app, pgPool);

  /* POST /entry/get */
  /* Get entry rows */
  /* Receives feature, page, & perPage. */
  attachEndpointEntryGet(app, pgPool);
};
