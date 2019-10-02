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
  errorContainer: {
    backgroundColor: theme.palette.error.dark,
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(0.5)}px 0`
  },
  dialogActions: {
    marginTop: theme.spacing(2)
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    setLoading(true);

    try {
      const payload = { email, password };
      const { data } = await axios.post("/auth/signin", payload);
      console.log(data);
      onClose();
    } catch (err) {
      setError(resourcesErrors[err]);
    }

    setLoading(false);
  };

  return (
    <Dialog fullScreen={isXs} open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">
        {resourcesDialogs.signin_title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{resourcesDialogs.signin_body}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
          fullWidth
        />
        {error && (
          <SnackbarContent
            classes={{ root: classes.errorContainer }}
            message={
              <Box display="flex" alignItems="center">
                <MdError size={24} />
                <Box marginLeft={1}>Error</Box>
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
        <Box flexGrow={1}>
          <Button variant="outlined" onClick={() => {}}>
            {resourcesDialogs.button_forgotpassword}
          </Button>
        </Box>
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
