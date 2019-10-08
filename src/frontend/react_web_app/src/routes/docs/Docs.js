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
      <Box padding={2}>
        <Paper>
          <Box padding={2}>
            <Typography variant="h4" style={{ fontWeight: 800 }}>
              YQuantify Documentation
            </Typography>
          </Box>
          <Box padding={2}>
            <Typography variant="h6" style={{ fontWeight: 800 }}>
              Getting Started
            </Typography>
            <Typography color="textSecondary" variant="body1">
              To begin using YQuantify:
              <ol>
                <li>
                  <span style={{ fontWeight: "800" }}>Sign Up</span> using the{" "}
                  <span style={{ fontWeight: "800" }}>Create Account</span>{" "}
                  button from the navigation bar.
                </li>
                <li>
                  Check your email inbox for a message from YQuantify with the
                  subject line{" "}
                  <span style={{ fontWeight: "800" }}>
                    Welcome to YQuantify!
                  </span>
                </li>
                <li>
                  Click the{" "}
                  <span style={{ fontWeight: "800" }}>Confirm Email</span>{" "}
                  button inside the email body.
                </li>
                <li>Choose a unique username for your account.</li>
                <li>
                  <span style={{ fontWeight: "800" }}>You're in!</span>
                </li>
              </ol>
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
