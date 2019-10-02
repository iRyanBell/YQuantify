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
      <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
      <DialogContent>
        <DialogContentText>Let's do this!</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
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
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};
