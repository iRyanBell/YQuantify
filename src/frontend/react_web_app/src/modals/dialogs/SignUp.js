import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Dialog,
  CircularProgress,
  useMediaQuery
} from "@material-ui/core";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import axios from "axios";

export default ({ open, onClose }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    setLoading(true);

    try {
      const payload = { email, password };
      const signUpDetails = await axios.post("/auth/signup", payload);
      console.log(signUpDetails);
      onClose();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Dialog fullScreen={isXs} open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
      <DialogContent>
        <DialogContentText>Let's do this!</DialogContentText>
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
      </DialogContent>
      <DialogActions>
        <Box flexGrow={1} marginLeft={0.5}>
          {loading && <CircularProgress size={24} />}
        </Box>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={handleSignUp}
          color="primary"
          variant="contained"
        >
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};
