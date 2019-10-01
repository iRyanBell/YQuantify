import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import DialogContainer from "../modals/DialogContainer";
import theme from "./theme";

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
    <DialogContainer />
  </ThemeProvider>
);
