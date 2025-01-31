import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("https://mern-user-authentication-api.vercel.app/register", { name, email, password })
      
      .then((result) => {
        console.log(result);
        if (result.data === "USER ALREADY EXISTS") {
          alert("E-MAIL ALREADY REGISTERED!");
          navigate("/register");
        } else {
          alert("REGISTERED SUCCESSFULLY!");
          navigate("/login");
        }
      })

      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert("E-MAIL ALREADY REGISTERED!");
          navigate("/register");
        }
      });
  };

  return (
    <div>
    <Navbar/>
      <div className="mt-28">
        <div>
          <h1 className="text-center font-semibold text-4xl mb-4">REGISTER</h1>
        </div>
        <form
          className="flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="artboard phone-1 space-y-4">
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)} // 'e' stores the value in the setter function (i.e) setName()
              placeholder="Enter Name"
              className="input input-bordered w-full max-w-xs"
              name="name"
            />
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
