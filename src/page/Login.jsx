import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../assets/style/Login.css";
import Logo from "../assets/image/logo.png";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/user/login", credentials);
      localStorage.setItem("email", credentials.email);
      navigate('/'); // Navigate to the homepage after successful login
    } catch (error) {
      console.error("There was an error logging in!", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="login-title">
          <h6>Welcome back !</h6>
          <div className="sub-title">
            Don't have an account ? <Link to="/register">Register here</Link>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              className="field-input"
              type="email"
              placeholder="Email"
              style={{ fontSize: "small" }}
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              className="field-input"
              type="password"
              placeholder="Password"
              style={{ fontSize: "small" }}
              name="password"
              value={credentials.password} 
              onChange={handleChange}
            />
          </Form.Group>
          <div className="forgot-password">
            <a href="/">Forgot password?</a>
          </div>
          <Form.Group className="mb-3">
            <Button
              className="btn-login"
              type="submit"
              style={{
                backgroundColor: "#F87555",
                border: "none",
                fontSize: "small",
              }}
            >
              Login
            </Button>
          </Form.Group>
          <div className="or">Or</div>
          <a href="#" className="btn-login-google">
            <i className="bi bi-google"></i>
            <span className="mx-2">Login with Google</span>
          </a>
        </Form>
      </div>
    </div>
  );
}

export default Login;
