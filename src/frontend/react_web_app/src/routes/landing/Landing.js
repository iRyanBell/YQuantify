import React from "react";
import Layout from "../../layout/Layout";
import logo from "../../assets/images/common/logo.svg";
import "./Landing.css";

export default () => (
  <Layout>
    <div className="Landing">
      <header className="Landing-header">
        <img src={logo} className="Landing-logo" alt="YQuantify logo" />
        <p>Coming Soon!</p>
      </header>
    </div>
  </Layout>
);
