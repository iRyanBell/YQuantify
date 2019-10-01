import React from "react";
import { AppBar, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/images/common/logo_icon_light.svg";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: theme.spacing(1)
  }
}));

const NavItemsLeft = () => {
  return <img src={logo} className="AppBar-logo" alt="YQuantify logo" />;
};

const NavItemsRight = () => {
  return <div>Auth Buttons</div>;
};

export default () => {
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
          <NavItemsRight />
        </Box>
      </Box>
    </AppBar>
  );
};
