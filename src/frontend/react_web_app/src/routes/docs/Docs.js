import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Box } from "@material-ui/core";

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
      <Box padding={2}>Hello</Box>
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
