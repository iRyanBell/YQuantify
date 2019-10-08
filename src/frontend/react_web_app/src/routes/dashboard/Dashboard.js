import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Box, Paper, Typography } from "@material-ui/core";

const Main = ({ onDialog }) => {
  return (
    <Box
      marginX="auto"
      width="100%"
      maxWidth={960}
      display="flex"
      flexDirection="column"
      flexGrow={1}
    >
      <Box marginTop={2}>
        <Paper>
          <Box padding={2}>
            <Typography variant="h4" style={{ fontWeight: 800 }}>
              Dashboard
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default () => {
  return (
    <Layout>
      <NavBar />
      <Main />
      <Footer />
    </Layout>
  );
};
