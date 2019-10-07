import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Box, Typography } from "@material-ui/core";
import resourcesLanding from "../../resources/english/landing";

const Hero = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      color="#fff"
      height={480}
      style={{
        backgroundImage: "url(landing_banner.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center bottom"
      }}
    >
      <Box
        padding={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box>
          <Typography variant="h2" style={{ fontWeight: 900 }}>
            {resourcesLanding.heading}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5">{resourcesLanding.subheading}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ({ onDialog }) => {
  return (
    <Layout>
      <NavBar onDialog={onDialog} />
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <Hero />
      </Box>
      <Footer />
    </Layout>
  );
};
