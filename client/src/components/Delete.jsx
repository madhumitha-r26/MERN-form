import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

function Delete() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    axios.post("https://mern-form-urip.vercel.app/users/delete", 
      { email }, 
      { withCredentials: true }
    )
    .then(result => {
      console.log(result);
      window.alert("User deleted successfully!");
      navigate("/");
    })
    .catch(err => {
      console.error("Error deleting user:", err);
    });
  };

  return (
    <div>
      <button
        className="btn btn-outline btn-primary"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        <DeleteIcon /> Delete
      </button>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Delete Details</h3>
          <form className="pt-4 flex flex-col" onSubmit={handleDelete}>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="input input-bordered w-full"
              required
            />
            <button className="btn btn-error mt-4 w-full">Delete User</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Delete;