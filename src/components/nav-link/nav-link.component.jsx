import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./nav-link.styles.css";

const CustomNavLink = ({ children, link }) => {
  const resolved = useResolvedPath(link);
  const match = useMatch({ path: resolved.pathname });

  return (
    <Link to={link}>
      <div
        className={` ${
          match ? "selected" : null
        } text-center align-middle h-16 p-4 text-xl font-semibold border-b-2 hover:text-2xl hover:cursor-pointer hover:bg-neutral-800 hover:text-neutral-50  transition-all `}
      >
        {children}
      </div>
    </Link>
  );
};

export default CustomNavLink;
