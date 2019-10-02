import React from "react";
import SignIn from "./dialogs/SignIn";
import SignUp from "./dialogs/SignUp";

export default ({ onClose, ...props }) => {
  return (
    <>
      <SignIn open={props.openSignIn} onClose={() => onClose("signIn")} />
      <SignUp open={props.openSignUp} onClose={() => onClose("signUp")} />
    </>
  );
};
