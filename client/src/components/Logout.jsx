import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    console.log("Logged out");
    navigate("/login");
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">MERN OPERATIONS</div>

      <div className="navbar-end">
        <button onClick={handleLogout} className="btn btn-outline btn-primary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
