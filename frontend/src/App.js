import "./App.css";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Verify from "./page/Verify";
import VerifyStatus from "./page/VerifyStatus";
import {Route, Routes, Router } from "react-router-dom";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
  );
}

export default App;
