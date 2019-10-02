import React, { Children, cloneElement, useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import DialogContainer from "../modals/DialogContainer";
import theme from "./theme";

export default ({ children }) => {
  const dialogStates = {
    signIn: useState(false),
    signUp: useState(false)
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
        cloneElement(child, { onDialog })
      )}
      <DialogContainer
        onClose={dialogId => onDialog(dialogId, false)}
        openSignIn={dialogStates.signIn[0]}
        openSignUp={dialogStates.signUp[0]}
      />
    </ThemeProvider>
  );
};
