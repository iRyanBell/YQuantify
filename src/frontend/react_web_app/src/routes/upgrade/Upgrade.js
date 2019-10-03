import React, { useState } from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";
import {
  Paper,
  Box,
  Button,
  Typography,
  TextField,
  SnackbarContent,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MdError, MdClose } from "react-icons/md";
import resourcesErrors from "../../resources/english/errors";
import resourcesUpgrade from "../../resources/english/upgrade";
import jws from "jsonwebtoken";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  textFieldRoot: {
    "& label": {
      "&:not(.MuiInputLabel-shrink)": {
        transform: "translate(14px, 15px) scale(1) !important"
      }
    }
  },
  textFieldInput: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`
  },
  errorContainer: {
    backgroundColor: theme.palette.error.main,
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(0.5)}px 0`
  },
  buttonWithCircularProgress: {
    paddingRight: theme.spacing(1)
  }
}));

const isValidActivation = activationKey => {
  try {
    return Boolean(jws.decode(activationKey));
  } catch (err) {
    return false;
  }
};

export default ({ onDialog }) => {
  const classes = useStyles();
  const activationKey = window.location.pathname.split("/").slice(-1)[0];
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    isValidActivation(activationKey)
      ? null
      : resourcesErrors["invalid-activation-key"]
  );

  const handleUpgrade = async () => {
    setLoading(true);

    try {
      const payload = { username, activationKey };
      const { data } = await axios.post("/auth/activate", payload);
      if (data.error) {
        return setError(resourcesErrors[data.error]);
      }
    } catch (err) {
      setError(resourcesErrors["server"]);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <NavBar onDialog={onDialog} />
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
                  classes={{ root: classes.textFieldRoot }}
                  label={resourcesUpgrade.field_username}
                  value={username}
                  onChange={e => setUsername(e.currentTarget.value)}
                  onKeyPress={e => e.key === "Enter" && handleUpgrade()}
                  variant="outlined"
                  fullWidth
                  autoFocus
                />
                {error && (
                  <SnackbarContent
                    classes={{ root: classes.errorContainer }}
                    message={
                      <Box display="flex" alignItems="center">
                        <MdError size={24} />
                        <Box marginLeft={1}>{error}</Box>
                      </Box>
                    }
                    action={[
                      <IconButton
                        key="error_close"
                        size="small"
                        onClick={() => setError(null)}
                      >
                        <MdClose color="#fff" size={24} />
                      </IconButton>
                    ]}
                  />
                )}
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
