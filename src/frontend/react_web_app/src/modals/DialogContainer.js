import React from "react";
import SignIn from "./dialogs/SignIn";

export default ({ openSignIn, onClose }) => {
  return (
    <>
      <SignIn open={openSignIn} onClose={() => onClose("signIn")} />
    </>
  );
};
