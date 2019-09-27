import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Maintenance from "../routes/maintenance/Maintenance";
import Landing from "../routes/landing/Landing";

export default () => (
  <Router>
    <Route path="/" exact component={Maintenance} />
    <Route path="/landing" exact component={Landing} />
  </Router>
);
