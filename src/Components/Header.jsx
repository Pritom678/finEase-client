import React, { use, useState } from "react";
import { Link } from "react-router";
import financeImg from "../assets/Business-and-financial-logo-design-template-isolated-on-transparent-background-PNG-removebg-preview.png";
import { AuthContext } from "../context/AuthContext";
import { IoLogOut } from "react-icons/io5";

const Header = () => {
  const [active, setActive] = useState("home");
  const { user, signOutUser } = use(AuthContext);
  const navLink = (
    <>
      <li
        onClick={() => setActive("home")}
        className={`rounded-sm transition-all duration-200 ease-in-out
    hover:scale-105 hover:bg-secondary hover:text-white active:scale-95  ${
      active === "home" ? "bg-secondary text-white" : ""
    }`}
      >
        <Link to="/home">Home</Link>
      </li>
      <li
        onClick={() => setActive("addTransaction")}
        className={`rounded-sm transition-all duration-200 ease-in-out
    hover:scale-105 hover:bg-secondary hover:text-white active:scale-95 ${
      active === "addTransaction" ? "bg-secondary text-white" : ""
    }`}
      >
        <Link to="/add-transaction">Add Transaction</Link>
      </li>
      <li
        onClick={() => setActive("myTransaction")}
        className={`rounded-sm transition-all duration-200 ease-in-out
    hover:scale-105 hover:bg-secondary hover:text-white active:scale-95 ${
      active === "myTransaction" ? "bg-secondary text-white" : ""
    }`}
      >
        <Link to="/my-transaction">My Transaction</Link>
      </li>
      <li
        onClick={() => setActive("reports")}
        className={`rounded-sm transition-all duration-200 ease-in-out
    hover:scale-105 hover:bg-secondary hover:text-white active:scale-95 ${
      active === "reports" ? "bg-secondary text-white" : ""
    }`}
      >
        <Link to="/reports">Reports</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-200 shadow-sm ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow text-near gap-1"
          >
            {navLink}
          </ul>
        </div>
        <div className="flex items-center ml-3 md:ml-5 lg:ml-8">
          <img src={financeImg} alt="logo" className="w-[35px]" />
          <Link to="/home" className="text-2xl font-bold text-primary ">
            FinEase
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navLink}</ul>
      </div>
      <div className="navbar-end mr-3 gap-1">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  referrerPolicy="no-referrer"
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu  menu-sm dropdown-content bg-base-200 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className=" pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>

              <input
                // onChange={(e) => handleTheme(e.target.checked)}
                type="checkbox"
                defaultChecked={localStorage.getItem("theme") === "dark"}
                className="toggle"
              />

              <li>
                <button
                  onClick={signOutUser}
                  className="btn btn-xs text-left bg-linear-to-r from-primary to-secondary text-white"
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setActive("login")}
              className={`btn p-4 border-0 rounded-sm hover:bg-secondary transition-all duration-300 ease-in-out
          hover:scale-105 hover:text-white ${
            active === "login" ? "bg-secondary text-white" : ""
          }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setActive("signup")}
              className={`btn p-4 border-0 rounded-sm hover:bg-secondary transition-all duration-300 ease-in-out
          hover:scale-105 hover:text-white ${
            active === "signup" ? "bg-secondary text-white" : ""
          }`}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
