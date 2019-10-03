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
  const [uid, setUid] = useState(null);
  const [isActivated, setIsActivated] = useState(false);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    isValidActivation(activationToken) ? null : resourcesErrors["invalid-token"]
  );

  useEffect(() => {
    const payload = { token: activationToken };
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
        setUid(data.uid);
        setIsActivated(true);
        setUsername(data.username);
      })
      .catch(err => {
        console.error(err);
        setError(resourcesErrors["server"]);
      });
  }, []);

  const redirectToStripe = async uid => {
    const stripe = window.Stripe("pk_test_Jk5tUWmPGGO41NMhr5T2cgcJ00VtcrxExE");
    const result = await stripe.redirectToCheckout({
      items: [{ plan: "basic", quantity: 1 }],
      clientReferenceId: String(uid),
      successUrl: "https://www.yquantify.com/success",
      cancelUrl: "https://www.yquantify.com/"
    });
    if (result.error) {
      setError(resourcesErrors["stripe-payment"]);
    }
  };

  const handleUpgrade = async () => {
    setLoading(true);

    if (uid) {
      setLoading(false);
      return redirectToStripe(uid);
    }

    try {
      const payload = { uid, username, activationToken };
      const { data } = await axios.post("/auth/activate", payload);
      if (data["error-details"]) {
        console.error(data["error-details"]);
      }
      if (data.error) {
        setLoading(false);
        return setError(resourcesErrors[data.error]);
      }
      window.localStorage.setItem("token", data.token);
      const tokenDetails = jws.decode(data.token);
      setUid(tokenDetails.uid);
      redirectToStripe(uid);
    } catch (err) {
      console.error(err);
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
                  value={username || ""}
                  disabled={username === null || isActivated}
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
                  <Button
                    disabled={loading}
                    onClick={handleUpgrade}
                    color="primary"
                    variant="contained"
                    classes={{
                      root: loading && classes.buttonWithCircularProgress
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <div>{resourcesUpgrade.button_upgrade}</div>
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
