import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import resourcesLanding from "../../resources/english/landing";

const useStyles = makeStyles(theme => ({
  whiteButton: {
    color: theme.palette.common.white,
    borderColor: "rgba(255, 255, 255, 0.5)"
  }
}));

const Hero = ({ onDialog }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={480}
      color="#fff"
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
        <Box marginBottom={1}>
          <Typography variant="h2" style={{ fontWeight: 700 }}>
            {resourcesLanding.heading}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" style={{ fontWeight: 300 }}>
            {resourcesLanding.subheading}
          </Typography>
        </Box>
        <Box padding={1} width="100%" display="flex" justifyContent="flex-end">
          <Button
            onClick={() => onDialog("signUp")}
            classes={{ root: classes.whiteButton }}
            variant="outlined"
          >
            {resourcesLanding.callToAction}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const Pricing = () => {
  return <Box></Box>;
};

export default () => {
  return (
    <Layout>
      <NavBar />
      <Hero />
      <Pricing />
      <Footer />
    </Layout>
  );
};
