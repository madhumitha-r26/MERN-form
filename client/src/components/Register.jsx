import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from 'axios';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/users/register", 
      { name, email, password }, 
      { withCredentials: true }
    )
    .then(result => {
      console.log(result);
      window.alert("Registered successfully!");
      navigate("/login");
    })
    .catch(err => {
      if (err.response) {
        window.alert("User already exists!");
        navigate("/");
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="mt-28">
        <div>
          <h1 className="text-center font-semibold text-4xl mb-4">REGISTER</h1>
        </div>
        <form className="flex justify-center items-center" onSubmit={handleSignUp}>
          <div className="artboard phone-1 space-y-4">
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="input input-bordered w-full max-w-xs"
              required
            />
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="input input-bordered w-full max-w-xs"
              required
            />
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="input input-bordered w-full max-w-xs"
              required
            />
            <button className="btn btn-primary w-full hover:bg-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;