import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEiYkfWmvAqzWD5J6jvi8GZhvh9s0QaQs",
  authDomain: "todo-with-firebase-a058a.firebaseapp.com",
  projectId: "todo-with-firebase-a058a",
  storageBucket: "todo-with-firebase-a058a.appspot.com",
  messagingSenderId: "602061481698",
  appId: "1:602061481698:web:b9150bb5bd6d80df8fe0bb",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
