import React, { useRef, useState } from "react";
import { auth } from "../../utils/firebase.utils";
import Input from "../input/input.component";
import Button from "../button/button.component";
import { signInWithEmailAndPassword } from "firebase/auth";
import ErrorDisplay from "../errordisplay/error-display.component";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [logInError, setLoginError] = useState("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
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
        default:
          {
            setLoginError(error.code);
          }
          break;
      }
    }
    e.target.reset();
  };

  return (
    <form
      className="w-5/6 lg:w-1/3 p-8 bg-neutral-100 shadow-xl m-8 rounded-3xl"
      onSubmit={handleLogIn}
    >
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
      <div>
        <Button className="bg-sky-600 text-neutral-50 text-base w-full mb-6">
          Sing in with google
        </Button>
      </div>
      <div>{logInError ? <ErrorDisplay>{logInError}</ErrorDisplay> : null}</div>
    </form>
  );
};

export default SignIn;
