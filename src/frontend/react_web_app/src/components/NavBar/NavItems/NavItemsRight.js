import React from "react";
import { Box, Button } from "@material-ui/core";
import resourcesNav from "../../../resources/english/nav";

const NavItemsRightGuest = ({ onDialog }) => {
  return (
    <Box display="flex">
      <Box marginRight={1}>
        <Button onClick={() => onDialog("signIn")}>
          {resourcesNav.signIn}
        </Button>
      </Box>
      <Button
        onClick={() => onDialog("signUp")}
        color="primary"
        variant="contained"
      >
        {resourcesNav.createAccount}
      </Button>
    </Box>
  );
};

const NavItemsRightMember = () => {
  const handleSignOut = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Box display="flex">
      <Button onClick={handleSignOut} color="primary" variant="contained">
        {resourcesNav.signOut}
      </Button>
    </Box>
  );
};

export default ({ onDialog, auth }) => {
  const isSignedIn = Boolean(auth.uid);

  return isSignedIn ? (
    <NavItemsRightMember />
  ) : (
    <NavItemsRightGuest onDialog={onDialog} />
  );
};
