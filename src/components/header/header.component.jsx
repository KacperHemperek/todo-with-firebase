import React from "react";
import { useState } from "react";
import NavMenu from "../nav-menu/nav-menu.component";

const Header = () => {
  const [openedNav, setOpenedNav] = useState(false);

  return (
    <div className="bg-neutral-100 shadow-lg">
      <div className="flex items-center justify-between ">
        <button className="p-4" onClick={() => setOpenedNav(!openedNav)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-all ${
              openedNav ? "" : "rotate-180"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-semibold mx-6 md:mx-28">Todos</h1>
        </div>
        {/* <input type="text" className="h-1/2 border-2 border-red-500" /> */}
      </div>
      <NavMenu openedNav={openedNav} />
    </div>
  );
};

export default Header;
