import React from "react";

const ErrorDisplay = ({ children }) => {
  return (
    <div className="flex items-center justify-center p-4 bg-red-300 text-red-600 font-semibold rounded-xl ">
      {children}
    </div>
  );
};

export default ErrorDisplay;
