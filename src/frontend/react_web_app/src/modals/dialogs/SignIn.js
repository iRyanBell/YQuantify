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
import { MdError, MdClose } from "react-icons/md";
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
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    setLoading(true);

    try {
      const payload = { username, password };
      const { data } = await axios.post("/auth/signin", payload);
      console.log(data);
      onClose();
    } catch (err) {
      setError(resourcesErrors[err]);
      console.error(err);
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
        {resourcesDialogs.signin_title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{resourcesDialogs.signin_body}</DialogContentText>
        <TextField
          margin="dense"
          InputProps={{
            className: classes.textFieldInput
          }}
          label={resourcesDialogs.field_username}
          value={username}
          onChange={e => setUsername(e.currentTarget.value)}
          variant="outlined"
          fullWidth
          autoFocus
        />
        <TextField
          margin="dense"
          InputProps={{
            className: classes.textFieldInput
          }}
          label={resourcesDialogs.field_password}
          type="password"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
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
              <IconButton size="small" onClick={() => setError(null)}>
                <MdClose color="#fff" size={24} />
              </IconButton>
            ]}
          />
        )}
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        <Box flexGrow={1} marginLeft={0.5}></Box>
        <Button onClick={onClose} color="primary">
          {resourcesDialogs.button_cancel}
        </Button>
        <Button
          disabled={loading}
          onClick={handleSignIn}
          color="primary"
          variant="contained"
          classes={{ root: loading && classes.buttonWithCircularProgress }}
        >
          <Box display="flex" alignItems="center">
            <div>{resourcesDialogs.button_signin}</div>
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
