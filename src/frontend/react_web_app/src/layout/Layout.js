import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

export default ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
