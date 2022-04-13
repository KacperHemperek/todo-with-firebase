import React from "react";
import Todo from "../../components/todo/todo.component";

const Todos = () => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col items-center w-full first:mt-4">
        <Todo message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, modi?" />
        <Todo message="" />
        <Todo message="Lorem ipsum dolor, sit amet consectetur adipisicing." />
        <Todo message="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam." />
      </div>
    </div>
  );
};

export default Todos;
