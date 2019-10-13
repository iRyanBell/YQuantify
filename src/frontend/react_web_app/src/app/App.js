import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Maintenance from "../routes/maintenance/Maintenance";
import Landing from "../routes/landing/Landing";
import Dashboard from "../routes/dashboard/Dashboard";
import Activate from "../routes/activate/Activate";
import Upgrade from "../routes/upgrade/Upgrade";
import Success from "../routes/success/Success";
import Docs from "../routes/docs/Docs";
import Reset from "../routes/reset/Reset";
import jwt from "jsonwebtoken";
import ReactGA from "react-ga";

export default () => {
  const token = window.localStorage.getItem("token");
  const auth = (token && jwt.decode(token)) || {};
  const isSignedIn = Boolean(auth.uid);

  const initializeReactGA = () => {
    ReactGA.initialize("UA-63336980-9");
    ReactGA.pageview("/");
  };

  initializeReactGA();

  return (
    <Router>
      {/* <Route path="/dashboard" exact component={Dashboard} /> */}
      {/* <Route path="/landing" exact component={Landing} /> */}
      <Route path="/" exact component={isSignedIn ? Dashboard : Landing} />
      <Route path="/activate" component={Activate} />
      <Route path="/upgrade" component={Upgrade} />
      <Route path="/reset" component={Reset} />
      <Route path="/success" exact component={Success} />
      <Route path="/docs" exact component={Docs} />
    </Router>
  );
};
