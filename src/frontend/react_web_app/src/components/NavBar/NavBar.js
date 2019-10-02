import React from "react";
import { AppBar, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavItemsLeft from "./NavItems/NavItemsLeft";
import NavItemsRight from "./NavItems/NavItemsRight";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: theme.spacing(1)
  }
}));

export default ({ onDialog }) => {
  const classes = useStyles();
  return (
    <AppBar classes={{ root: classes.appBar }}>
      <Box display="flex">
        <NavItemsLeft />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={1}
        >
          <NavItemsRight onDialog={onDialog} />
        </Box>
      </Box>
    </AppBar>
  );
};
