import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <NavLink to="/" className="w-full text-2xl font-mono align-middle">
            MERN FORM
          </NavLink>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/register" className="w-full">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="w-full">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
