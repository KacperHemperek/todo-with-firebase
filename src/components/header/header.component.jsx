import React, { useEffect, useRef } from "react";
import { useState } from "react";
import NavMenu from "../nav-menu/nav-menu.component";
import Button from "../button/button.component";
import { auth } from "../../utils/firebase.utils";
import useCloseOnOutsideClick from "../../hooks/useCloseOnOutsideClick";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const [openedNav, setOpenedNav] = useState(false);
  const navbarRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  useCloseOnOutsideClick(navbarRef, setOpenedNav);

  useEffect(() => {
    setOpenedNav(false);
  }, [location]);

  return (
    <div className="bg-neutral-100 shadow-lg" ref={navbarRef}>
      <div className="flex items-center justify-between">
        <button
          className="p-4"
          onClick={() => setOpenedNav(openedNav ? false : true)}
        >
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
        <div className="flex justify-end items-center w-full">
          <div>
            <h1 className="text-3xl font-semibold">Todos</h1>
          </div>
          {currentUser ? (
            <Button
              handleClick={() => {
                auth.signOut();
                navigate("/signin");
              }}
              className="bg-blue-500 text-neutral-100 my-3 mx-3 md:mx-16 hover:bg-blue-600"
            >
              Sign Out
            </Button>
          ) : (
            <Link to="/signin">
              <div className="flex justify-center items-center p-4 max-w-full rounded-3xl text-lg font-semibold bg-blue-500 text-neutral-100 my-3 mx-3 md:mx-16 hover:bg-blue-600">
                Log In
              </div>
            </Link>
          )}
        </div>
      </div>
      <NavMenu openedNav={openedNav} />
    </div>
  );
};

export default Header;
