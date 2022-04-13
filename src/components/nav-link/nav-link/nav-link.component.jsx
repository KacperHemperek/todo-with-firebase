import React from "react";

const NavLink = ({ children }) => {
  return (
    <div className="text-center align-middle h-16 p-4 text-xl font-semibold border-b-2 hover:text-2xl hover:cursor-pointer hover:bg-neutral-800 hover:text-neutral-50  transition-all ">
      {children}
    </div>
  );
};

export default NavLink;
