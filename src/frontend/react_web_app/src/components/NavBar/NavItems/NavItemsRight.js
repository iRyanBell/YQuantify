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

const NavItemsRightMember = ({ onDialog }) => {
  const handleSignOut = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleNewEntry = () => {
    onDialog("newEntry");
  };

  return (
    <Box display="flex">
      <Button onClick={handleNewEntry}>New Entry</Button>
      <Box marginLeft={1}>
        <Button onClick={handleSignOut} color="primary" variant="contained">
          {resourcesNav.signOut}
        </Button>
      </Box>
    </Box>
  );
};

export default ({ onDialog, auth }) => {
  const isSignedIn = Boolean(auth.uid);

  return isSignedIn ? (
    <NavItemsRightMember onDialog={onDialog} />
  ) : (
    <NavItemsRightGuest onDialog={onDialog} />
  );
};
