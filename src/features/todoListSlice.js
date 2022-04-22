import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const todoListSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addTodo, setTodos } = todoListSlice.actions;

export default todoListSlice.reducer;
