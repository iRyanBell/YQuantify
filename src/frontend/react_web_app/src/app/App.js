import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Checkout from "../routes/checkout/Checkout";
import Maintenance from "../routes/maintenance/Maintenance";
import Landing from "../routes/landing/Landing";
import Activate from "../routes/activate/Activate";
import Upgrade from "../routes/upgrade/Upgrade";
import Success from "../routes/success/Success";

export default () => (
  <Router>
    <Route path="/" exact component={Maintenance} />
    <Route path="/checkout" exact component={Checkout} />
    <Route path="/landing" exact component={Landing} />
    <Route path="/activate" component={Activate} />
    <Route path="/upgrade" component={Upgrade} />
    <Route path="/success" exact component={Upgrade} />
  </Router>
);
