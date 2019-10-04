import React from "react";
import Layout from "../../layout/Layout";
import logo from "../../assets/images/common/logo_full_dark.svg";

export default () => (
  <Layout>
    <div className="Maintenance" style={{ textAlign: "center" }}>
      <header
        className="Maintenance-header"
        style={{
          backgroundColor: "#282c34",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "calc(10px + 2vmin)",
          color: "white"
        }}
      >
        <img
          src={logo}
          className="Maintenance-logo"
          style={{ height: "40vmin" }}
          alt="YQuantify logo"
        />
        <p>Coming Soon!</p>
      </header>
    </div>
  </Layout>
);
