import React, { Children, cloneElement, useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import DialogContainer from "../modals/DialogContainer";
import theme from "./theme";
import jwt from "jsonwebtoken";

export default ({ children }) => {
  const token = window.localStorage.getItem("token");
  const auth = (token && jwt.decode(token)) || {};

  const dialogStates = {
    signIn: useState(false),
    signUp: useState(false),
    forgot: useState(false)
  };

  const onDialog = (dialogId, isVisible) => {
    /* Default visibility: Toggle state */
    if (isVisible === undefined) {
      isVisible = !dialogStates[dialogId][0];
    }
    dialogStates[dialogId][1](isVisible);
  };

  return (
    <ThemeProvider theme={theme}>
      {Children.map(children, child =>
        /* Attach handlers to Layout child components. */
        cloneElement(child, { onDialog, auth })
      )}
      <DialogContainer
        onDialog={onDialog}
        onClose={dialogId => onDialog(dialogId, false)}
        openSignIn={dialogStates.signIn[0]}
        openSignUp={dialogStates.signUp[0]}
        openForgot={dialogStates.forgot[0]}
      />
    </ThemeProvider>
  );
};
