import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import resourcesApp from "../../../resources/english/app";
import logo from "../../../assets/images/common/logo_icon_light.svg";

export default () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box display="flex" alignItems="center">
      <Link to={"/"} style={{ display: "flex" }}>
        <img src={logo} className="AppBar-logo" alt={resourcesApp.logo} />
      </Link>
      {isSmUp && (
        <Box display="flex" marginLeft={1}>
          <Typography
            variant="h6"
            color="textSecondary"
            style={{ fontWeight: 300 }}
          >
            Y
          </Typography>
          <Typography variant="h6" color="primary" style={{ fontWeight: 400 }}>
            Quantify
          </Typography>
        </Box>
      )}
    </Box>
  );
};
