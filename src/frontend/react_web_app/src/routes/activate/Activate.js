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
  CircularProgress,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MdError, MdClose } from "react-icons/md";
import resourcesErrors from "../../resources/english/errors";
import resourcesActivate from "../../resources/english/activate";
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

const isValidActivation = activationToken => {
  try {
    return Boolean(jws.decode(activationToken));
  } catch (err) {
    return false;
  }
};

export default ({ onDialog }) => {
  const classes = useStyles();
  const activationToken = window.location.pathname.split("/").slice(-1)[0];
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    isValidActivation(activationToken)
      ? null
      : resourcesErrors["invalid-activation-key"]
  );

  const handleActivate = async () => {
    setLoading(true);

    try {
      const payload = { username, activationToken };
      const { data } = await axios.post("/auth/activate", payload);
      if (data.error) {
        setLoading(false);
        return setError(resourcesErrors[data.error]);
      }
      window.localStorage.set("token", JSON.stringify(data.token));
      window.location.href = "/";
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
            <Box marginTop={2} padding={4}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                {resourcesActivate.heading}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {resourcesActivate.subheading}
              </Typography>
              <Box marginTop={1}>
                <TextField
                  margin="dense"
                  InputProps={{
                    className: classes.textFieldInput
                  }}
                  classes={{ root: classes.textFieldRoot }}
                  label={resourcesActivate.field_username}
                  value={username}
                  onChange={e => setUsername(e.currentTarget.value)}
                  onKeyPress={e => e.key === "Enter" && handleActivate()}
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
                  <Button
                    disabled={loading}
                    onClick={handleActivate}
                    color="primary"
                    variant="contained"
                    classes={{
                      root: loading && classes.buttonWithCircularProgress
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <div>{resourcesActivate.button_activate}</div>
                      {loading && (
                        <Box
                          display="flex"
                          alignItems="center"
                          flexGrow={1}
                          marginLeft={2}
                        >
                          <CircularProgress size={20} />
                        </Box>
                      )}
                    </Box>
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
