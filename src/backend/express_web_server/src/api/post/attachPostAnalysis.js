const attachEndpointAnalysisWeightSensitivity = require("./analysis/weightSensitivity");
const attachEndpointAnalysisGet = require("./analysis/get");

module.exports = (app, pgPool) => {
  /* POST /analysis/weight-sensitivity */
  /* Performs weight sensitivity analysis with Flask-powered ML. */
  /* Return analysis data */
  attachEndpointAnalysisWeightSensitivity(app, pgPool);

  /* GET /analysis/get */
  /* Gets a cached analysis */
  /* Receives analysis key */
  attachEndpointAnalysisGet(app, pgPool);
};
