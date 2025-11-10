import React from "react";
import { Link } from "react-router";
import financeImg from "../assets/Business-and-financial-logo-design-template-isolated-on-transparent-background-PNG-removebg-preview.png";

const Header = () => {
  const navLink = (
    <>
      <li className="rounded-sm transition-all duration-200 ease-in-out
    hover:scale-105 hover:bg-secondary  ">
        <Link to="/home">Home</Link>
      </li>
      <li className="rounded-sm transition-all duration-200 ease-in-out
    hover:scale-105 hover:bg-secondary  ">
        <Link to="/add-transaction">Add Transaction</Link>
      </li>
      <li className="rounded-sm transition-all duration-200 ease-in-out
    hover:scale-105 hover:bg-secondary  ">
        <Link to="/my-transaction">My Transaction</Link>
      </li>
      <li className="rounded-sm transition-all duration-200 ease-in-out
    hover:scale-105 hover:bg-secondary  ">
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
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow text-near "
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
        <ul className="menu menu-horizontal px-1">{navLink}</ul>
      </div>
      <div className="navbar-end mr-3">
        <Link
          to="/login"
          className="btn p-4 border-0 rounded-sm hover:bg-secondary transition-all duration-300 ease-in-out
          hover:scale-105"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="btn p-4 border-0 rounded-sm hover:bg-secondary     transition-all duration-300 ease-in-out
          hover:scale-105"
        >
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Header;
