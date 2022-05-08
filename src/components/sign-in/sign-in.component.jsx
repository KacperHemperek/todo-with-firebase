import React, { useRef, useState } from "react";
import { auth } from "../../utils/firebase.utils";
import Input from "../input/input.component";
import Button from "../button/button.component";
import { signInWithEmailAndPassword } from "firebase/auth";
import ErrorDisplay from "../errordisplay/error-display.component";
import { useNavigate } from "react-router-dom";
import useLogInWithGoogle from "../../hooks/useLogInWithGoogle";

const SignIn = () => {
  const [logInError, setLoginError] = useState("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const [loginWithGoogle, error] = useLogInWithGoogle();

  const handleLogInWithEmail = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      setLoginError("");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setLoginError("Wrong email or password!");

          break;
        case "auth/user-not-found":
          setLoginError("This user does not exist!");

          break;
        case "auth/popup-closed-by-user":
          setLoginError("");

          break;
        case "auth/cancelled-popup-request":
          setLoginError("");

          break;
        default:
          console.error(error);

          break;
      }
    }
    e.target.reset();
  };

  return (
    <div className="w-11/12 lg:w-1/3  p-8 bg-neutral-100 shadow-xl my-6 md:m-8 rounded-3xl">
      <form onSubmit={handleLogInWithEmail}>
        <h1 className="text-xl font-semibold">Sign In</h1>
        <div className="my-8">
          <Input
            type="email"
            placeholder="example@email.com"
            required={true}
            ref={emailRef}
          />
        </div>
        <div className="my-8">
          <Input
            type="password"
            placeholder="password"
            required={true}
            ref={passwordRef}
          />
        </div>

        <div>
          <Button
            className="bg-green-600 text-neutral-50 text-base w-full mb-6"
            type="submit"
          >
            Sign in
          </Button>
        </div>
      </form>
      <div>
        <Button
          className="bg-sky-600 text-neutral-50 text-base w-full mb-6"
          handleClick={loginWithGoogle}
        >
          Sign in with google
        </Button>
      </div>
      <div>{logInError ? <ErrorDisplay>{error}</ErrorDisplay> : null}</div>
    </div>
  );
};

export default SignIn;
