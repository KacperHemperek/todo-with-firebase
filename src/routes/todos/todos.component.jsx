import React, { useCallback, useEffect, useState } from "react";
import Todo from "../../components/todo/todo.component";
import Input from "../../components/input/input.component";
import Button from "../../components/button/button.component";
import { useDispatch, useSelector } from "react-redux";
import {
  arrayUnion,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase.utils";

const Todos = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    let unsubscribeFromSnapshot;
    if (user) {
      console.log("fetching todos");
      unsubscribeFromSnapshot = onSnapshot(
        doc(db, "users", user.uid),
        (snapshot) => {
          const todos = snapshot
            .data()
            .todos.sort((a, b) => {
              return a.createdAt.seconds - b.createdAt.seconds;
            })
            .map((todo, idx) => ({
              id: idx,
              message: todo.message,
              done: todo.done,
            }));
          console.log(todos);
          setTodos(todos);
        }
      );
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
      const userDocRef = doc(db, "users", user.uid);

      await updateDoc(userDocRef, {
        todos: arrayUnion({
          message: newTodo,
          done: false,
          createdAt: Timestamp.now(),
        }),
      });
    } catch (error) {
      console.error(error);
    }

    setNewTodo("");
  };

  const handleRemoveTodo = () => {};
  return (
    <div className="flex flex-col items-center relative">
      <div className="flex flex-col items-center w-full pb-52 md:pb-28 first:mt-4">
        {todos.map((todo, index) => {
          return <Todo key={index} message={todo.message} />;
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
          <Button className="bg-red-600 text-neutral-50 w-full">
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
