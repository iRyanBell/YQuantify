import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Checkout from "../routes/checkout/Checkout";
import Maintenance from "../routes/maintenance/Maintenance";
import Landing from "../routes/landing/Landing";
import Dashboard from "../routes/dashboard/Dashboard";
import Activate from "../routes/activate/Activate";
import Upgrade from "../routes/upgrade/Upgrade";
import Success from "../routes/success/Success";
import jwt from "jsonwebtoken";

export default () => {
  const token = window.localStorage.getItem("token");
  const auth = (token && jwt.decode(token)) || {};
  const isSignedIn = Boolean(auth.uid);

  return (
    <Router>
      <Route path="/" exact component={isSignedIn ? Dashboard : Maintenance} />
      <Route path="/checkout" exact component={Checkout} />
      <Route path="/landing" exact component={Landing} />
      <Route path="/activate" component={Activate} />
      <Route path="/upgrade" component={Upgrade} />
      <Route path="/success" exact component={Success} />
    </Router>
  );
};
