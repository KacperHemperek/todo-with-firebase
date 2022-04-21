import React, { useRef, useState } from "react";
import { auth, provider } from "../../utils/firebase.utils";
import Input from "../input/input.component";
import Button from "../button/button.component";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import ErrorDisplay from "../errordisplay/error-display.component";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [logInError, setLoginError] = useState("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const handleLogInWithGoogle = async (e) => {
    e.preventDefault();

    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case "auth/popup-closed-by-user":
          {
            setLoginError("");
          }
          break;
        case "auth/cancelled-popup-request":
          {
            setLoginError("");
          }
          break;
        default:
          {
            console.error(error);
          }
          break;
      }
    }
  };

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
          {
            setLoginError("Wrong email or password!");
          }
          break;
        case "auth/user-not-found":
          {
            setLoginError("This user does not exist!");
          }
          break;
        case "auth/popup-closed-by-user":
          {
            setLoginError("");
          }
          break;
        case "auth/cancelled-popup-request":
          {
            setLoginError("");
          }
          break;
        default:
          {
            console.error(error);
          }
          break;
      }
    }
    e.target.reset();
  };

  return (
    <div className="w-5/6 lg:w-1/3 p-8 bg-neutral-100 shadow-xl m-8 rounded-3xl">
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
            Sing in
          </Button>
        </div>
      </form>
      <div>
        <Button
          className="bg-sky-600 text-neutral-50 text-base w-full mb-6"
          handleClick={handleLogInWithGoogle}
        >
          Sing in with google
        </Button>
      </div>
      <div>{logInError ? <ErrorDisplay>{logInError}</ErrorDisplay> : null}</div>
    </div>
  );
};

export default SignIn;
