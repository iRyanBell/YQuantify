const attachEndpointEntryAdd = require("./entry/add");
const attachEndpointEntryRemove = require("./entry/remove");
const attachEndpointEntryList = require("./entry/list");

module.exports = (app, pgPool) => {
  /* POST /entry/add */
  /* Add a new entry */
  /* Receives feature & value. */
  attachEndpointEntryAdd(app, pgPool);

  /* POST /entry/remove */
  /* Remove a new entry */
  /* Receives a feature id. */
  attachEndpointEntryRemove(app, pgPool);

  /* POST /entry/list */
  /* List entry rows */
  /* Receives feature, page, & perPage. */
  attachEndpointEntryList(app, pgPool);
};
