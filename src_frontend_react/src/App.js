import React from "react";
import Layout from "./layout/Layout";
import logo from "./logo.svg";
import "./App.css";

export default () => (
  <Layout>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Coming Soon!</p>
      </header>
    </div>
  </Layout>
);
