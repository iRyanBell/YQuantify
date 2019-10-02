import React from "react";
import { Button, TextField, Dialog, useMediaQuery } from "@material-ui/core";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export default ({ open, onClose }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog fullScreen={isXs} open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
      <DialogContent>
        <DialogContentText>Welcome to yQuantify!</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Sign In
        </Button>
      </DialogActions>
    </Dialog>
  );
};
