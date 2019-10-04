import React from "react";
import SignIn from "./dialogs/SignIn";
import SignUp from "./dialogs/SignUp";
import Forgot from "./dialogs/Forgot";

export default ({ onClose, onDialog, ...props }) => {
  return (
    <>
      <SignIn
        onDialog={onDialog}
        open={props.openSignIn}
        onClose={() => onClose("signIn")}
      />
      <SignUp
        onDialog={onDialog}
        open={props.openSignUp}
        onClose={() => onClose("signUp")}
      />
      <Forgot
        onDialog={onDialog}
        open={props.openForgot}
        onClose={() => onClose("forgot")}
      />
    </>
  );
};
