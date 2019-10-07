import React from "react";
import { Box, Link, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const Column1 = () => {
  return (
    <Box
      padding={5}
      display="flex"
      width="calc(100% / 3)"
      flexDirection="column"
    >
      <Link color="inherit">Documentation</Link>
    </Box>
  );
};

const Column2 = () => {
  return (
    <Box
      padding={5}
      display="flex"
      width="calc(100% / 3)"
      flexDirection="column"
    >
      <Link color="inherit">ABC</Link>
    </Box>
  );
};

const Column3 = () => {
  return (
    <Box
      padding={5}
      display="flex"
      width="calc(100% / 3)"
      flexDirection="column"
    >
      <Link color="inherit">XYZ</Link>
    </Box>
  );
};

export default () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      width="100%"
      flexDirection={isSm ? "column" : "row"}
      display="flex"
      color="#fff"
      style={{
        backgroundColor: "#121214"
      }}
    >
      <Column1 />
      <Column2 />
      <Column3 />
    </Box>
  );
};
