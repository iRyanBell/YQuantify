import React from "react";
import { Box, Button } from "@material-ui/core";

export default ({ onDialog }) => {
  return (
    <Box display="flex">
      <Box marginRight={1}>
        <Button onClick={() => onDialog("signIn")}>Sign In</Button>
      </Box>
      <Button
        onClick={() => onDialog("signUp")}
        color="primary"
        variant="contained"
      >
        Get Started
      </Button>
    </Box>
  );
};
