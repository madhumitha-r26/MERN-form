import "./App.css";
import Login from "./Components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import { Route, Routes} from "react-router-dom";
import Update from "./components/Update";
import Delete from "./components/Delete";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/welcome" element={<Welcome />}></Route>
      <Route path="/update" element={<Update/>}></Route>
      <Route path="/delete" element={<Delete/>}></Route>
    </Routes>
  );
}

export default App;