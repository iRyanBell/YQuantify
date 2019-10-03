import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import { Paper, Box, Typography } from "@material-ui/core";
import resourcesActivate from "../../resources/english/activate";

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
                {resourcesActivate.heading}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {resourcesActivate.subheading}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
};
