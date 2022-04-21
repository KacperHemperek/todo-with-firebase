import React from "react";

const Input = React.forwardRef(
  ({ type, placeholder, onChange, required }, ref) => {
    return (
      <div className="flex justify-center items-center bg-white p-3 w-full h-full rounded-3xl border-2 border-neutral-300 md:text-xl">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full focus:outline-none"
          onChange={onChange}
          ref={ref}
          required={required}
        />
      </div>
    );
  }
);

export default Input;
