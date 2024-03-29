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
  successContainer: {
    backgroundColor: theme.palette.success.main,
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(0.5)}px 0`
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

  const handleForgotPassword = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      const payload = { email };
      const { data } = await axios.post("/auth/forgot", payload);
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

  const handleCloseSuccess = () => {
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      fullScreen={isXs}
      open={open}
      onClose={onClose}
    >
      <DialogTitle id="form-dialog-title">
        {resourcesDialogs.forgot_title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{resourcesDialogs.forgot_body}</DialogContentText>
        <TextField
          margin="dense"
          InputProps={{
            className: classes.textFieldInput
          }}
          classes={{ root: classes.textFieldRoot }}
          label={resourcesDialogs.field_email}
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
          onKeyPress={e => e.key === "Enter" && handleForgotPassword()}
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
        {success && (
          <SnackbarContent
            classes={{ root: classes.successContainer }}
            message={
              <Box display="flex" alignItems="center">
                <MdThumbUp size={24} />
                <Box marginLeft={1}>{resourcesDialogs.forgot_success}</Box>
              </Box>
            }
            action={[
              <IconButton
                key="success_close"
                size="small"
                onClick={handleCloseSuccess}
              >
                <MdClose color="#fff" size={24} />
              </IconButton>
            ]}
          />
        )}
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        <Box flexGrow={1} />
        <Button onClick={onClose} color="primary">
          {success
            ? resourcesDialogs.button_close
            : resourcesDialogs.button_cancel}
        </Button>
        <Button
          disabled={loading || success}
          onClick={handleForgotPassword}
          color="primary"
          variant="contained"
          classes={{ root: loading && classes.buttonWithCircularProgress }}
        >
          <Box display="flex" alignItems="center">
            <div>{resourcesDialogs.button_send}</div>
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
