import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import { Paper, Box, Typography } from "@material-ui/core";
import resourcesUpgrade from "../../resources/english/upgrade";

export default ({ onDialogShow }) => {
  const activationKey = window.location.pathname.split("/").slice(-1)[0];

  return (
    <Layout>
      <NavBar onDialogShow={onDialogShow} />
      <Box width="100%" maxWidth={960} marginX="auto">
        <Box paddingX={2}>
          <Paper>
            <Box marginTop={2} padding={2}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                {resourcesUpgrade.heading}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {resourcesUpgrade.subheading}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
};
