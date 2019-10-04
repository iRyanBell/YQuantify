import React from "react";
import { AppBar, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavItemsLeft from "./NavItems/NavItemsLeft";
import NavItemsRight from "./NavItems/NavItemsRight";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`
  }
}));

export default ({ onDialog, auth }) => {
  const classes = useStyles();
  return (
    <AppBar position="static" classes={{ root: classes.appBar }} elevation={0}>
      <Box display="flex">
        <NavItemsLeft auth={auth} />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={1}
        >
          <NavItemsRight auth={auth} onDialog={onDialog} />
        </Box>
      </Box>
    </AppBar>
  );
};
