import React from "react";

const NavLink = ({ children }) => {
  return (
    <div className="text-center align-middle h-16 p-4 text-xl font-semibold border-b-2 hover:font-bold hover:text-2xl transition-all ">
      {children}
    </div>
  );
};

export default NavLink;
