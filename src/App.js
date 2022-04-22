import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/header/header.component";
import SignInSignUp from "./routes/sign-in-sign-up/sign-in-sign-up.component";
import Todos from "./routes/todos/todos.component";
import { auth } from "./utils/firebase.utils";
import { setUser } from "./features/userSlice";
import { Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({ uid: auth.currentUser.uid, email: auth.currentUser.email })
        );
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/signin" element={<SignInSignUp />} />
      </Routes>
    </>
  );
}

export default App;
