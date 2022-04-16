import React from "react";
import "./button.styles.css";

const Button = ({ handleClick, styles, type, children }) => {
  return (
    <button
      className={`${styles} flex justify-center items-center p-4 max-w-full rounded-3xl `}
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
