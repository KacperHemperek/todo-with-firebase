import { auth, db, provider } from "../utils/firebase.utils";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useLogInWithGoogle = async (errorHandler) => {
  const navigate = useNavigate();

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
        {
          errorHandler("");
        }
        break;
      case "auth/cancelled-popup-request":
        {
          errorHandler("");
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
