import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/common/logo_icon_light.svg";

export default () => {
  return (
    <Link to={"/"}>
      <img src={logo} className="AppBar-logo" alt="YQuantify logo" />
    </Link>
  );
};
