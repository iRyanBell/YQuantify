const attachEndpointCsvDaily = require("./csv/daily");

module.exports = app => {
  /* GET /csv/daily */
  /* Receive start and end date /*
	/* Returns daily dataframe in .csv format. */
  attachEndpointCsvDaily(app);
};
