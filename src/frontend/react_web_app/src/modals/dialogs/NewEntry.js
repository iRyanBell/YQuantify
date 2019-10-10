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
  Select,
  MenuItem,
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
  errorContainer: {
    backgroundColor: theme.palette.error.main,
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
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [feature, setFeature] = useState("weight");

  const handleAddEntry = async () => {
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token")
        }
      };
      const payload = { value, feature, timestamp: Date.now() };
      const { data } = await axios.post("/entry/add", payload, config);
      if (data["error-details"]) {
        console.error(data["error-details"]);
      }
      if (data.error) {
        setLoading(false);
        return setError(resourcesErrors[data.error]);
      }
      onClose();

      window.location.href = "/";
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
        {resourcesDialogs.newentry_title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{resourcesDialogs.newentry_body}</DialogContentText>
        <Select
          fullWidth
          value={feature}
          onChange={e => setFeature(e.target.value)}
          inputProps={{
            name: "direction"
          }}
        >
          <MenuItem value={"weight"}>Weight (lbs)</MenuItem>
          <MenuItem value={"calories"}>Calories (kcal)</MenuItem>
          <MenuItem value={"sleep"}>Sleep (hrs)</MenuItem>
          <MenuItem value={"exercise"}>Exercise (mins)</MenuItem>
        </Select>
        <Box marginTop={1}>
          <TextField
            margin="dense"
            InputProps={{
              className: classes.textFieldInput
            }}
            classes={{ root: classes.textFieldRoot }}
            label={resourcesDialogs.field_value}
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            onKeyPress={e => e.key === "Enter" && handleAddEntry()}
            variant="outlined"
            fullWidth
          />
        </Box>
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
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        <Box flexGrow={1} marginLeft={0.5}></Box>
        <Button onClick={onClose} color="primary">
          {resourcesDialogs.button_cancel}
        </Button>
        <Button
          disabled={loading}
          onClick={handleAddEntry}
          color="primary"
          variant="contained"
          classes={{ root: loading && classes.buttonWithCircularProgress }}
        >
          <Box display="flex" alignItems="center">
            <div>{resourcesDialogs.button_add}</div>
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
