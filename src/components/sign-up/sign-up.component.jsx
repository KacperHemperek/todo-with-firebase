import React, { useRef, useState } from "react";
import { auth } from "../../utils/firebase.utils";
import Input from "../input/input.component";
import Button from "../button/button.component";
import { createUserWithEmailAndPassword } from "firebase/auth";
import ErrorDisplay from "../errordisplay/error-display.component";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/firebase.utils";
import { doc, setDoc } from "firebase/firestore";
import useLogInWithGoogle from "../../hooks/useLogInWithGoogle";

const SignUp = () => {
  const emailRefSignUp = useRef("");
  const passwordRefSignUp = useRef("");
  const confirmPassrowdRefSignUp = useRef("");
  const navigate = useNavigate();
  const [logInWithGoogle, error] = useLogInWithGoogle();

  const [signUpError, setSignUpError] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const password = passwordRefSignUp.current.value;
    const confirmPassword = confirmPassrowdRefSignUp.current.value;
    const email = emailRefSignUp.current.value;

    if (password === confirmPassword) {
      try {
        const credentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const { user } = credentials;
        try {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            todos: [],
          });
        } catch (error) {
          console.error(error);
        }
        navigate("/");
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setSignUpError("Email is alredy used!");
            break;

          default:
            break;
        }
      }
    } else {
      setSignUpError("Passwords must be the same ");
    }
    e.target.reset();
  };

  return (
    <form
      className="w-11/12 lg:w-1/3 p-8 bg-neutral-100 shadow-xl my-6 md:mx-8 rounded-3xl"
      onSubmit={handleCreateUser}
    >
      <h1 className="text-xl font-semibold">Sign Up</h1>
      <div className="my-8">
        <Input
          type="email"
          ref={emailRefSignUp}
          placeholder="example@email.com"
          required={true}
        />
      </div>
      <div className="my-8">
        <Input
          type="password"
          ref={passwordRefSignUp}
          placeholder="password"
          required={true}
        />
      </div>
      <div className="my-8">
        <Input
          type="password"
          ref={confirmPassrowdRefSignUp}
          placeholder="confirm password"
          required={true}
        />
      </div>
      <div>
        <Button
          className="bg-green-600 text-neutral-50 text-base w-full  mb-6"
          type="submit"
        >
          Sign up
        </Button>
        <Button
          className="bg-sky-600 text-neutral-50 text-base w-full mb-6"
          handleClick={logInWithGoogle}
        >
          Sign up with google
        </Button>
      </div>

      <div>{signUpError ? <ErrorDisplay>{error}</ErrorDisplay> : null}</div>
    </form>
  );
};

export default SignUp;
