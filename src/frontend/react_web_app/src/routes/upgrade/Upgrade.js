import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import { Paper, Box } from "@material-ui/core";

export default ({ onDialogShow }) => {
  return (
    <Layout>
      <NavBar onDialogShow={onDialogShow} />
      <Box width="100%" maxWidth={960} marginX="auto">
        <Paper>
          <Box marginTop={2} padding={2}>
            Upgrade
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};
