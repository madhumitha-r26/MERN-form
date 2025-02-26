import { React, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:5000/users/login",
        { email, password },
        { withCredentials: true }
      );

      console.log(result);

      if (result.status === 200) {
        window.alert("Logged in successfully!");
        navigate("/welcome");
      }
    } catch (err) {
      if (err.response) {
        window.alert("Invalid credentials!");
        navigate("/")
        console.log(err.response.data);
      } else {
        console.error("Login error:", err);
      }
    }
  };

  return (
    <div>
      <Navbar />
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
              type="text"
              placeholder="Enter Email"
              required
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
              className="input input-bordered w-full max-w-xs"
            />
          

            <button className="btn btn-primary w-full hover:bg-primary">
              Login
            </button>
            <p className="text-center">
              Don't have an account?{" "}
              <NavLink to={"/register"} className="text-blue-600">
                Register{" "}
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
