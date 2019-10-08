import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Box, Paper, IconButton, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { MdAdd, MdViewList } from "react-icons/md";

const Main = () => {
  const theme = useTheme();
  return (
    <Box
      marginX="auto"
      width="100%"
      maxWidth={960}
      display="flex"
      flexDirection="column"
      flexGrow={1}
    >
      <Box padding={2}>
        <Paper>
          <Box display="flex" padding={2} alignItems="center">
            <Typography variant="h6" style={{ fontWeight: 800 }}>
              Dashboard
            </Typography>
            <Box
              display="flex"
              flexGrow={1}
              justifyContent="flex-end"
              color="#fff"
            >
              <IconButton color="inherit">
                <MdViewList color={theme.palette.primary.main} />
              </IconButton>
              <Box marginLeft={1}>
                <IconButton
                  color="inherit"
                  style={{ backgroundColor: theme.palette.primary.main }}
                >
                  <MdAdd color="white" />
                </IconButton>
              </Box>
            </Box>
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
