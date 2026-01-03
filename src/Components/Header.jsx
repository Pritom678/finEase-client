import React, { use, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import financeImg from "../assets/Business-and-financial-logo-design-template-isolated-on-transparent-background-PNG-removebg-preview.png";
import { AuthContext } from "../context/AuthContext";
import { IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const { user, signOutUser } = use(AuthContext);
  const location = useLocation();
  const [active, setActive] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  useEffect(() => {
    if (location.pathname === "/") setActive("home");
    else if (location.pathname === "/add-transaction")
      setActive("addTransaction");
    else if (location.pathname === "/my-transaction")
      setActive("myTransaction");
    else if (location.pathname === "/reports") setActive("reports");
    else if (location.pathname === "/login") setActive("login");
    else if (location.pathname === "/signup") setActive("signup");
  }, [location.pathname]);

  const navLink = (
    <>
      <li
        onClick={() => setActive("home")}
        className={`rounded-lg px-4 py-2 transition-all duration-200 
          hover:scale-105 hover:bg-teal-600 hover:text-white active:scale-95 font-medium
          ${
            active === "home"
              ? "bg-teal-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300"
          }`}
      >
        <Link to="/">Home</Link>
      </li>
      <li
        onClick={() => setActive("addTransaction")}
        className={`rounded-lg px-4 py-2 transition-all duration-200 
          hover:scale-105 hover:bg-teal-600 hover:text-white active:scale-95 font-medium
          ${
            active === "addTransaction"
              ? "bg-teal-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300"
          }`}
      >
        <Link to="/add-transaction">Add Transaction</Link>
      </li>
      <li
        onClick={() => setActive("myTransaction")}
        className={`rounded-lg px-4 py-2 transition-all duration-200 
          hover:scale-105 hover:bg-teal-600 hover:text-white active:scale-95 font-medium
          ${
            active === "myTransaction"
              ? "bg-teal-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300"
          }`}
      >
        <Link to="/my-transaction">My Transaction</Link>
      </li>
      <li
        onClick={() => setActive("reports")}
        className={`rounded-lg px-4 py-2 transition-all duration-200 
          hover:scale-105 hover:bg-teal-600 hover:text-white active:scale-95 font-medium
          ${
            active === "reports"
              ? "bg-teal-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300"
          }`}
      >
        <Link to="/reports">Reports</Link>
      </li>
    </>
  );

  return (
    <div
      className={
        theme === "dark"
          ? "navbar bg-[#0f172a] text-gray-100 border-b border-gray-800 shadow-xl"
          : "navbar bg-slate-50 text-gray-800 border-b border-slate-200 shadow-sm"
      }
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            className={`menu menu-sm dropdown-content rounded-box z-10 mt-3 w-56 p-3 shadow-lg gap-2
              ${
                theme === "dark"
                  ? "bg-gray-900 border border-gray-700"
                  : "bg-white border border-slate-200"
              }`}
          >
            {navLink}
          </ul>
        </div>

        <div className="flex items-center ml-3 md:ml-5 lg:ml-8">
          <img src={financeImg} alt="logo" className="w-[35px]" />
          <Link
            to="/"
            className="ml-3 text-2xl font-bold text-teal-700 dark:text-teal-400"
          >
            FinEase
          </Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">{navLink}</ul>
      </div>

      <div className="navbar-end mr-3 gap-3">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-teal-600 dark:ring-teal-500 ring-offset-base-100 ring-offset-2">
                <img
                  alt="User avatar"
                  referrerPolicy="no-referrer"
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  className="rounded-full"
                />
              </div>
            </div>

            <ul
              className={`menu menu-sm dropdown-content rounded-box z-50 mt-3 w-64 p-4 shadow-2xl
                ${
                  theme === "dark"
                    ? "bg-gray-900 border border-gray-700"
                    : "bg-white border border-slate-200"
                }`}
            >
              <div className="pb-4 border-b border-gray-300 dark:border-gray-600">
                <li className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {user.displayName || "User"}
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400">
                  {user.email}
                </li>
                <li className="mt-4">
                  <Link to="/profile" className="flex items-center gap-2">
                    <FaUser className="text-teal-600 dark:text-teal-400" />
                    Profile
                  </Link>
                </li>
              </div>

              <div className="py-5 flex justify-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium">Dark Mode</span>
                  <input
                    onChange={(e) => handleTheme(e.target.checked)}
                    type="checkbox"
                    defaultChecked={theme === "dark"}
                    className="toggle toggle-success"
                  />
                </label>
              </div>

              <li>
                <button
                  onClick={signOutUser}
                  className="btn btn-block bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-md"
                >
                  <IoLogOut className="text-lg" /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setActive("login")}
              className={`btn rounded-lg px-6 border-0 transition-all duration-300
                ${
                  active === "login"
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                } hover:scale-105`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setActive("signup")}
              className="btn rounded-lg px-6 bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
