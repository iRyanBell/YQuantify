import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import { Typography } from "@material-ui/core";
import resourcesLanding from "../../resources/english/landing";

export default ({ onDialog }) => {
  return (
    <Layout>
      <NavBar onDialog={onDialog} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url(landing_banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          width: "100%",
          height: 600,
          color: "#fff"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div>
            <Typography variant="h2" style={{ fontWeight: 900 }}>
              {resourcesLanding.heading}
            </Typography>
          </div>
          <div>
            <Typography variant="h5">{resourcesLanding.subheading}</Typography>
          </div>
        </div>
      </div>
    </Layout>
  );
};
