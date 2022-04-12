import React from "react";
import NavLink from "../nav-link/nav-/link.component";

const NavMenu = ({ openedNav }) => {
  return (
    <nav
      className={`absolute shadow-xl transition-all bg-neutral-100 w-1/2 h-screen md:w-1/5 border-t-2 ${
        openedNav && "-translate-x-full"
      }`}
    >
      <NavLink>Todos</NavLink>
      <NavLink>Smth</NavLink>
    </nav>
  );
};

export default NavMenu;
