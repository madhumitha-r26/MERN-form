import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import { Route, Routes, NavLink, BrowserRouter } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const IsLoggedInContext = createContext(false);
export const SetIsLoggedInContext = createContext(false);

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("https://mern-user-authentication-api.vercel.app/user", { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <IsLoggedInContext.Provider value={IsLoggedIn}>
      <SetIsLoggedInContext.Provider value={setIsLoggedIn}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={IsLoggedIn ? <NavLink to="/welcome" replace/> : <Login />}
          ></Route>
          <Route
            path="/register"
            element={IsLoggedIn ? <NavLink to="/welcome" replace/> : <Register />}
          ></Route>
          <Route
            path="/welcome"
            element={IsLoggedIn ? <Welcome /> : <NavLink to="/" replace />}
          ></Route>
        </Routes>
      </SetIsLoggedInContext.Provider>
    </IsLoggedInContext.Provider>
  );
}

export default App;
