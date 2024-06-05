import "./App.css";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Verify from "./page/Verify";
import VerifyStatus from "./page/VerifyStatus";
import {Route, Routes, Redirect } from "react-router-dom";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/verify-status" element={<VerifyStatus />} />
        </Routes>
      </div>
  );
}

export default App;
