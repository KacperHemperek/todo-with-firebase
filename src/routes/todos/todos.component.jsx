import React, { useEffect, useState } from "react";
import Todo from "../../components/todo/todo.component";
import Input from "../../components/input/input.component";
import Button from "../../components/button/button.component";
import { useSelector } from "react-redux";
import {
  collection,
  doc,
  onSnapshot,
  Timestamp,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase.utils";
import { v4 as uuidv4 } from "uuid";

const Todos = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    let unsubscribeFromSnapshot;
    if (user) {
      //getting query for all todos in users collection
      const colectionRef = collection(doc(db, "users", user.uid), "todos");
      const q = query(colectionRef);

      //pushing all todos data to array and updating state
      unsubscribeFromSnapshot = onSnapshot(q, (snapshot) => {
        const todos = [];
        snapshot.forEach((doc) => {
          todos.push(doc.data());
        });

        setTodos(
          todos.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
        );
      });
    }
    return unsubscribeFromSnapshot;
  }, [setTodos, user]);

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("login first to add todo!");
      setNewTodo("");
      return;
    }
    try {
      const todoId = uuidv4();
      const docRef = doc(db, "users", user.uid, "todos", todoId);

      await setDoc(docRef, {
        id: todoId,
        message: newTodo,
        done: false,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error(error);
    }

    setNewTodo("");
  };

  const handleRemoveTodos = () => {};
  return (
    <div className="flex flex-col items-center relative">
      <div className="flex flex-col items-center w-full pb-52 md:pb-28 first:mt-4">
        {todos.map(({ message, done, id }, index) => {
          return <Todo key={index} id={id} done={done} message={message} />;
        })}
      </div>
      <form
        className="fixed grid grid-cols-2 gap-6 p-6 bg-neutral-100 md:grid-cols-4 bottom-0 w-full"
        onSubmit={handleAddTodo}
      >
        <div className="flex items-center justify-center col-span-2">
          <Input
            placeholder="Add todo..."
            type="text"
            onChange={handleChange}
            value={newTodo}
            required={true}
          />
        </div>
        <div className="flex items-center justify-center ">
          <Button className="bg-green-600 w-full text-neutral-50" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <Button
            className="bg-red-600 text-neutral-50 w-full"
            handleClick={handleRemoveTodos}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Todos;
