import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CreateIcon from "@mui/icons-material/Create";

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/users/update", 
      { id, name, email, password }, 
      { withCredentials: true }
    )
    .then(result => {
      console.log(result);
      window.alert("User updated successfully!");
      document.getElementById("my_modal_3").close();
      navigate("/welcome");
    })
    .catch(err => {
      console.error("Error updating user:", err);
    });
  };

  return (
    <div>
      <button
        className="btn btn-outline btn-primary"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <CreateIcon /> Update
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("my_modal_3").close()}>
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Update Details</h3>
          <form className="mt-4 gap-4 phone-1 space-y-4" onSubmit={handleUpdate}>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="input input-bordered w-full "
              required
            />
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="input input-bordered w-full "
              required
            />
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="input input-bordered w-full "
              required
            />
            <button className="btn btn-success mt-4 w-full">Update User</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Update;