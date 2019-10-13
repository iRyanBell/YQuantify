import React from "react";
import { Link } from "react-router-dom";
import { Box, Link as Anchor, useMediaQuery } from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  link: {
    cursor: "pointer",
    color: "#fff",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

const Column1 = () => {
  return (
    <Box
      padding={5}
      display="flex"
      width="calc(100% / 3)"
      flexDirection="column"
    >
      <div>&copy; {new Date().getFullYear()} yquantify.com</div>
    </Box>
  );
};

const Column2 = () => {
  const classes = useStyles();

  return (
    <Box
      padding={5}
      display="flex"
      width="calc(100% / 3)"
      flexDirection="column"
    >
      <Anchor component={Link} to="/docs" classes={{ root: classes.link }}>
        Documentation
      </Anchor>
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
      <Anchor href="mailto:support@yquantify.com" color="inherit">
        Contact Us
      </Anchor>
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
