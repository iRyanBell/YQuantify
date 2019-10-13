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
            </Typography>
            <ol>
              <li>
                <Typography color="textSecondary" variant="body1">
                  <span style={{ fontWeight: "800" }}>Sign Up</span> using the{" "}
                  <span style={{ fontWeight: "800" }}>Create Account</span>{" "}
                  button from the navigation bar.
                </Typography>
              </li>
              <li>
                <Typography color="textSecondary" variant="body1">
                  Check your email inbox for a message from YQuantify with the
                  subject line{" "}
                  <span style={{ fontWeight: "800" }}>
                    Welcome to YQuantify!
                  </span>
                </Typography>
              </li>
              <li>
                <Typography color="textSecondary" variant="body1">
                  Click the{" "}
                  <span style={{ fontWeight: "800" }}>Confirm Email</span>{" "}
                  button inside the email body.
                </Typography>
              </li>
              <li>
                <Typography color="textSecondary" variant="body1">
                  Choose a unique username for your account.
                </Typography>
              </li>
              <li>
                <Typography color="textSecondary" variant="body1">
                  <span style={{ fontWeight: "800" }}>You're in!</span>
                </Typography>
              </li>
            </ol>
          </Box>

          <Box padding={2}>
            <Typography variant="h6" style={{ fontWeight: 800 }}>
              Using the dashboard
            </Typography>
            <Typography color="textSecondary" variant="body1">
              Adding data to your dashboard:
            </Typography>
            <ol>
              <li>
                <Typography color="textSecondary" variant="body1">
                  Click the <span style={{ fontWeight: "800" }}>New Entry</span>{" "}
                  button from the nav bar.
                </Typography>
              </li>
              <li>
                <Typography color="textSecondary" variant="body1">
                  Select a feature from the dropdown menu, then enter a numeric
                  value.
                </Typography>
              </li>
              <li>
                <Typography color="textSecondary" variant="body1">
                  Click the <span style={{ fontWeight: "800" }}>Add</span>{" "}
                  button.
                </Typography>
              </li>
              <li>
                <Typography color="textSecondary" variant="body1">
                  To remove values, use the{" "}
                  <span style={{ fontWeight: "800" }}>Edit List</span> button
                  from the upper-right corner of a feature section.
                </Typography>
              </li>
            </ol>
          </Box>

          <Box padding={2}>
            <Typography variant="h6" style={{ fontWeight: 800 }}>
              Performing an analysis
            </Typography>
            <Typography color="textSecondary" variant="body1">
              Calculate your weight-sensitivity analysis:
            </Typography>
            <ol>
              <li>
                <Typography color="textSecondary" variant="body1">
                  Log at least 5 full days of data (exercise, sleep, and
                  calories).
                </Typography>
              </li>
              <li>
                <Typography color="textSecondary" variant="body1">
                  Click the <span style={{ fontWeight: "800" }}>Refresh</span>{" "}
                  button.
                </Typography>
              </li>
              <li>
                <Typography color="textSecondary" variant="body1">
                  Scores will be generated for each feature using a machine
                  learning algorithm that gets to known your unique profile. The
                  higher the score for a given feature, the more impact it has
                  on your weight loss success.
                </Typography>
              </li>
            </ol>
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
