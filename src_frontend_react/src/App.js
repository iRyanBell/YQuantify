import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./routes/landing/Landing";

export default () => (
  <Router>
    <Route path="/" exact component={Landing} />
  </Router>
);
