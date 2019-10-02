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
import dialogs from "../../resources/english/dialogs";
import errors from "../../resources/english/errors";
import axios from "axios";

const useStyles = makeStyles(theme => ({
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

  const handleSignUp = async () => {
    setLoading(true);

    try {
      const payload = { email, password };
      const { data } = await axios.post("/auth/signup", payload);
      console.log(data);
      onClose();
    } catch (err) {
      setError(errors[err]);
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Dialog fullScreen={isXs} open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">{dialogs.signup_title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogs.signup_body}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label={dialogs.field_email}
          type="email"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          label={dialogs.field_password}
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
          {dialogs.button_cancel}
        </Button>
        <Button
          disabled={loading}
          onClick={handleSignUp}
          color="primary"
          variant="contained"
          classes={{ root: loading && classes.buttonWithCircularProgress }}
        >
          <Box display="flex" alignItems="center">
            <div>{dialogs.button_signup}</div>
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
