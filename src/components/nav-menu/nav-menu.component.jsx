import React from "react";
import CustomNavLink from "../nav-link/nav-link.component";

const NavMenu = React.forwardRef(({ openedNav }, ref) => {
  return (
    <nav
      ref={ref}
      className={`absolute shadow-xl transition-all bg-neutral-100 w-1/2  md:w-1/5 border-t-2 z-10 ${
        !openedNav && "-translate-x-full"
      }`}
    >
      <CustomNavLink link="/">Todos</CustomNavLink>
      <CustomNavLink link="/notes">Notes</CustomNavLink>
      <CustomNavLink link="/about">About</CustomNavLink>
      <CustomNavLink link="/signin">Sign In</CustomNavLink>
    </nav>
  );
});

export default NavMenu;
