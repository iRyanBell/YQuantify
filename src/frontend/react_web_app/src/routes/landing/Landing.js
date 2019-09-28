import React from "react";
import Layout from "../../layout/Layout";
import { AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/images/common/logo_icon_light.svg";
import "./Landing.css";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: theme.spacing(1)
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <Layout>
      <AppBar classes={{ root: classes.appBar }}>
        <img src={logo} className="AppBar-logo" alt="YQuantify logo" />
      </AppBar>
      It begins
    </Layout>
  );
};