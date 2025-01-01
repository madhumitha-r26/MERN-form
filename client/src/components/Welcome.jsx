import React from "react";
import Logout from "./Logout";
import { useLocation } from "react-router-dom";

const Welcome = () => {
  const location = useLocation();
  const user = location.state?.user; //checks for the location

  // ?. - called optional shading that is used to safely access the user object within the state property of the location object

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="text-xl"> </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <Logout to="/" className="w-full">
              Logout
            </Logout>
          </ul>
        </div>
      </div>

      <div className="mt-28 flex justify-center items-center">
        <h1
          className="text-3xl"
          style={{ color: "white", textTransform: "uppercase" }}
        >
          WELCOME {user && user.name}
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
