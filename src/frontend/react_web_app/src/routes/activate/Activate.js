import React, { useState, useEffect } from "react";
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
import jwt from "jsonwebtoken";
import axios from "axios";
import ReactGA from "react-ga";

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

const isValidToken = token => {
  try {
    return Boolean(jwt.decode(token));
  } catch (err) {
    return false;
  }
};

export default () => {
  const classes = useStyles();
  const token = window.location.pathname.split("/").slice(-1)[0];
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [error, setError] = useState(
    isValidToken(token) ? null : resourcesErrors["invalid-token"]
  );

  useEffect(() => {
    if (!isValidToken(window.location.pathname.split("/").slice(-1)[0])) {
      return setError(resourcesErrors["invalid-token"]);
    }

    const token = window.location.pathname.split("/").slice(-1)[0];
    const payload = { token };
    setLoading(true);
    axios
      .post("/token/details", payload)
      .then(({ data }) => {
        if (data["error-details"]) {
          console.error(data["error-details"]);
        }
        if (data.error) {
          setLoading(false);
          return setError(resourcesErrors[data.error]);
        }

        if (data.username) {
          setUsername(data.username);
          setIsActivated(true);
          setError(resourcesErrors["already-activated"]);
        } else {
          setUsername("");
        }

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(resourcesErrors["server"]);
        setLoading(false);
      });
  }, []);

  const handleActivate = async () => {
    setLoading(true);

    try {
      const payload = { username, token };
      const { data } = await axios.post("/auth/activate", payload);
      if (data["error-details"]) {
        console.error(data["error-details"]);
      }
      if (data.error) {
        setLoading(false);
        return setError(resourcesErrors[data.error]);
      }

      ReactGA.event({
        category: "user",
        action: "/auth/activate"
      });

      window.localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError(resourcesErrors["server"]);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <NavBar />
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
                  disabled={isActivated}
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
                    disabled={loading || !isValidToken(token) || isActivated}
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
