import {React, useContext, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { SetIsLoggedInContext } from "../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setIsLoggedIn=useContext(SetIsLoggedInContext)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //login path for entering data
      const loginResponse = await axios.post(
        "https://mern-user-authentication-api.vercel.app/login", 
        { email, password },
        { withCredentials: true }
      );

//users path for accesing the collection in the database
      if (loginResponse.data === "SUCCESS") {
        const userResponse = await axios.get("https://mern-user-authentication-api.vercel.app/users", {
        withCredentials: true,
});

        if (userResponse.data.user) {
          setIsLoggedIn(true)
          navigate("/welcome", { state: { user: userResponse.data.user } });
        } else {
          alert("USER NOT AUTHENTICATED.");
        }
      } else {
        alert("LOGIN FAILED! NO USER EXISTS");
      }
    } catch (err) {
      if (err.response) {
        console.error("Error Response:", err.response.data);
        if (err.response.status === 400) {
          alert("NO USER REGISTERED!");
          navigate("/register");
        } else if (err.response.status === 401) {
          alert("INCORRECT PASSWORD!");
        } else {
          alert("AN UNEXPECTED ERROR OCCURRED. PLEASE TRY AGAIN.");
        }
      } else {
        console.error("Unexpected Error:", err);
        alert("AN UNEXPECTED ERROR OCCURRED. PLEASE TRY AGAIN.");
      }
    }
  };

  return (
    <div>
      <Navbar/>

      <div className="mt-28">
        <div>
          <h1 className="text-center font-semibold text-4xl mb-4">LOGIN</h1>
        </div>
        <form
          className="flex justify-center items-center"
          onSubmit={handleLogin}
        >
          <div className="artboard phone-1 space-y-4">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="input input-bordered w-full max-w-xs"
              name="email"
            />
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="input input-bordered w-full max-w-xs"
              name="password"
            />
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
