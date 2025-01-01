import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SetIsLoggedInContext } from "../App.jsx";

const Logout = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useContext(SetIsLoggedInContext);
  const handleLogout = () => {
    axios
      .post("http://localhost:5000/logout", {}, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          navigate("/"); //navigates to home page
        }
      })
      .catch((error) => {
        console.error("ERROR LOGGING OUT:", error);
        alert("AN ERROR OCCURRED DURING LOGOUT. PLEASE TRY AGAIN.");
      });
  };

  return (
    <div>
      <button className="btn btn-outline btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
