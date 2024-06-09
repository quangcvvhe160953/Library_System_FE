import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./page/Admin";
import ForgotPassword from "./page/ForgotPassword";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import ResetPassword from "./page/ResetPassword";
import Verify from "./page/Verify";
import VerifyStatus from "./page/VerifyStatus";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verify-status" element={<VerifyStatus />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
