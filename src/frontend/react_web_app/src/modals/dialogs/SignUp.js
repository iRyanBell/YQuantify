import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Dialog,
  CircularProgress,
  SnackbarContent,
  IconButton,
  useMediaQuery
} from "@material-ui/core";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { MdError, MdThumbUp, MdClose } from "react-icons/md";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import resourcesDialogs from "../../resources/english/dialogs";
import resourcesErrors from "../../resources/english/errors";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  dialog: {
    maxWidth: 400
  },
  dialogActions: {
    marginTop: theme.spacing(2)
  },
  errorContainer: {
    backgroundColor: theme.palette.error.main,
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(0.5)}px 0`
  },
  successContainer: {
    backgroundColor: theme.palette.success.main,
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(0.5)}px 0`
  },
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
  buttonWithCircularProgress: {
    paddingRight: theme.spacing(1)
  }
}));

export default ({ open, onClose }) => {
  const theme = useTheme();
  const classes = useStyles();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      const payload = { email, password };
      const { data } = await axios.post("/auth/signup", payload);
      if (data["error-details"]) {
        console.error(data["error-details"]);
      }
      if (data.error) {
        setLoading(false);
        return setError(resourcesErrors[data.error]);
      }
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(resourcesErrors["server"]);
    }

    setLoading(false);
  };

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      fullScreen={isXs}
      open={open}
      onClose={onClose}
    >
      <DialogTitle id="form-dialog-title">
        {resourcesDialogs.signup_title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{resourcesDialogs.signup_body}</DialogContentText>
        <TextField
          margin="dense"
          InputProps={{
            className: classes.textFieldInput
          }}
          classes={{ root: classes.textFieldRoot }}
          label={resourcesDialogs.field_email}
          type="email"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
          onKeyPress={e => e.key === "Enter" && handleSignUp()}
          variant="outlined"
          fullWidth
          autoFocus
        />
        <TextField
          margin="dense"
          InputProps={{
            className: classes.textFieldInput
          }}
          classes={{ root: classes.textFieldRoot }}
          label={resourcesDialogs.field_password}
          type="password"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
          onKeyPress={e => e.key === "Enter" && handleSignUp()}
          variant="outlined"
          fullWidth
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
        {success && (
          <SnackbarContent
            classes={{ root: classes.successContainer }}
            message={
              <Box display="flex" alignItems="center">
                <MdThumbUp size={24} />
                <Box marginLeft={1}>{resourcesDialogs.signup_success}</Box>
              </Box>
            }
            action={[
              <IconButton
                key="success_close"
                size="small"
                onClick={() => setSuccess(false)}
              >
                <MdClose color="#fff" size={24} />
              </IconButton>
            ]}
          />
        )}
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        <Box flexGrow={1} marginLeft={0.5}></Box>
        <Button onClick={onClose} color="primary">
          {success
            ? resourcesDialogs.button_close
            : resourcesDialogs.button_cancel}
        </Button>
        <Button
          disabled={loading || success}
          onClick={handleSignUp}
          color="primary"
          variant="contained"
          classes={{ root: loading && classes.buttonWithCircularProgress }}
        >
          <Box display="flex" alignItems="center">
            <div>{resourcesDialogs.button_signup}</div>
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
      </DialogActions>
    </Dialog>
  );
};
