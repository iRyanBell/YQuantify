const attachEndpointServerHealth = require("./server/health");

module.exports = app => {
  /* GET /server/health */
  /* Check server health (Called by Render.com) /*
	/* Returns 200. */
  attachEndpointServerHealth(app);
};
