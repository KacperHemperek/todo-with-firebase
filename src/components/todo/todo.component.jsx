import React, { useState } from "react";

const Todo = ({ message }) => {
  const [checked, setChecked] = useState(true);

  return (
    <div
      className={`flex p-4 md:p-6 my-3 w-4/5 items-center rounded-3xl shadow-lg hover:cursor-pointer ${
        checked
          ? "bg-green-600 text-neutral-50"
          : "bg-neutral-100 text-neutral-900"
      }`}
    >
      <div>
        {checked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>

      <span className=" flex justify-between w-full items-center">
        <div className="ml-6 text-base md:text-xl">{message}</div>
        <span className="p-2 transition-all hover:text-neutral-50 hover:bg-red-600 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7  "
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
        </span>
      </span>
    </div>
  );
};

export default Todo;
