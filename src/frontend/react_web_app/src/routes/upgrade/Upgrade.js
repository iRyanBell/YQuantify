import React, { useState } from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import { Paper, Box, Button, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import resourcesUpgrade from "../../resources/english/upgrade";

const useStyles = makeStyles(theme => ({
  textFieldInput: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`
  }
}));

export default ({ onDialogShow }) => {
  const classes = useStyles();
  const activationKey = window.location.pathname.split("/").slice(-1)[0];
  const [username, setUsername] = useState("");

  const handleUpgrade = () => {};

  return (
    <Layout>
      <NavBar onDialogShow={onDialogShow} />
      <Box width="100%" maxWidth={600} marginX="auto">
        <Box paddingX={2}>
          <Paper>
            <Box marginTop={1} padding={4}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                {resourcesUpgrade.heading}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {resourcesUpgrade.subheading}
              </Typography>
              <Box marginTop={1}>
                <TextField
                  margin="dense"
                  InputProps={{
                    className: classes.textFieldInput
                  }}
                  label={resourcesUpgrade.field_username}
                  value={username}
                  onChange={e => setUsername(e.currentTarget.value)}
                  onKeyPress={e => e.key === "Enter" && handleUpgrade()}
                  variant="outlined"
                  fullWidth
                  autoFocus
                />
                <Box display="flex" marginTop={1} justifyContent="flex-end">
                  <Button variant="contained" color="primary">
                    Upgrade Account
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
};
