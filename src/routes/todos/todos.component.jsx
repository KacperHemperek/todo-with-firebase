import { useState } from "react";
import Todo from "../../components/todo/todo.component";
import Input from "../../components/input/input.component";
import Button from "../../components/button/button.component";

const Todos = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    console.log("clicked add");
    console.log(todos);
    setTodos((todos) => [...todos, { id: todos.length + 1, message: newTodo }]);
    setNewTodo("");
  };
  return (
    <div className="flex flex-col items-center min-h-screen relative">
      <div className="flex flex-col items-center w-full pb-56 first:mt-4">
        {todos.map(({ id, message }) => {
          return <Todo key={id} message={message} />;
        })}
      </div>
      <div className="fixed grid grid-cols-2 gap-6 p-6 bg-neutral-100 md:grid-cols-4 bottom-0 w-full">
        <div className="flex items-center justify-center col-span-2">
          <Input
            placeholder="Add todo..."
            type="text"
            onChange={handleChange}
            value={newTodo}
          />
        </div>
        <div className="flex items-center justify-center ">
          <Button
            styles="bg-green-600 text-neutral-50"
            handleClick={handleAddTodo}
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <Button styles="bg-red-600 text-neutral-50">
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
      </div>
    </div>
  );
};

export default Todos;
