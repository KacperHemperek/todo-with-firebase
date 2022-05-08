import { auth, db } from "../utils/firebase.utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { provider } from "../utils/firebase.utils";
import { getDoc, doc, setDoc } from "firebase/firestore";

const useLogInWithGoogle = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const logInWithGoogle = async () => {
    try {
      const credentials = await signInWithPopup(auth, provider);

      const { user } = credentials;
      const docSnap = await getDoc(doc(db, "users", user.uid));
      console.log(docSnap.exists());
      if (docSnap.exists()) {
        navigate("/");
        return;
      } else {
        try {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            todos: [],
          });
        } catch (error) {
          console.error(error);
        }
      }

      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
          setError("");
          break;
        case "auth/cancelled-popup-request":
          setError("");
          break;
        default:
          console.error(error);
          break;
      }
    }
  };

  return [logInWithGoogle, error];
};

export default useLogInWithGoogle;
