import React from "react";
import NavLink from "../nav-link/nav-link/nav-link.component";

const NavMenu = ({ openedNav }) => {
  return (
    <nav
      className={`absolute shadow-xl transition-all bg-neutral-100 w-1/2  md:w-1/5 border-t-2 ${
        !openedNav && "-translate-x-full"
      }`}
    >
      <NavLink className="">Todos</NavLink>
      <NavLink>Notes</NavLink>
      <NavLink>About</NavLink>
    </nav>
  );
};

export default NavMenu;
