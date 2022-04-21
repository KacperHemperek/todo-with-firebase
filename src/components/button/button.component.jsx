import React from "react";
import "./button.styles.css";

const Button = ({ handleClick, className, type, children }) => {
  return (
    <button
      className={`${className} flex justify-center items-center p-4 max-w-full rounded-3xl text-lg font-semibold `}
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
