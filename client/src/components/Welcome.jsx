import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import { useLocation, useNavigate } from "react-router-dom";
import Update from "./Update";
import Delete from "./Delete";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
      console.log("User set from location state:", location.state.user);
    }

    const token = window.localStorage.getItem("token");
    fetch("http://localhost:5000/users/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("Logged in successfully");
          window.localStorage.setItem("token", data.data);
          setUser(data.user); // Assuming the user data is in data.user
        } else {
          console.log("Not logged in");
        }
      })
      .catch((error) => {
        console.error("Error verifying token:", error);
      });
  }, [location.state, navigate]);

  return (
    <div>
      <Logout />
      <div className="artboard mt-28 flex justify-center items-center">
        <div className="card bg-neutral text-neutral-content w-96">
          <div className="card-body items-center text-center">
            <h1
              className="text-3xl"
              style={{ color: "white", textTransform: "uppercase" }}
            >
              WELCOME {user && user.name ? user.name : "Guest"}
            </h1>

            <div className="flex flex-col md:flex-row p-4 gap-4">
              <Update setUser={setUser} />
              <Delete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;