const attachEndpointAnalysisWeightSensitivity = require("./analysis/weightSensitivity");

module.exports = (app, pgPool) => {
  /* POST /analysis/weight-sensitivity */
  /* Performs weight sensitivity analysis with Flask-powered ML. */
  /* Return analysis data */
  attachEndpointAnalysisWeightSensitivity(app, pgPool);
};
