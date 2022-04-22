import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import todosReducer from "../features/todoListSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
});
