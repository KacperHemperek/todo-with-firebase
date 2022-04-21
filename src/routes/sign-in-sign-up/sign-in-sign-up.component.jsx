import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const SignInSignUp = () => {
  return (
    <div className="flex flex-wrap justify-center items-baseline ">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInSignUp;
