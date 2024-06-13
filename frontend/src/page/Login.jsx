import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../assets/style/Login.css";
import Logo from "../assets/image/logo.png";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import authApi from "../api/AuthAPI";
import * as jwtDecode from 'jwt-decode';
function Login() {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [errorMessage, setErrorMessage] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const emailRegex = /^[a-zA-Z0-9]+[@]([a-z]+[.]){1,2}[a-z]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      authApi
      .login(credentials)
      .then((response) => {
        if (response.code === 200) {
          localStorage.setItem('user-access-token', response.data.accessToken);
          // var decoded = jwtDecode(response.data.accessToken); // check lại chỗ này tại sao cứ đến đây là bị exception
          // localStorage.setItem('role', decoded.userInfo[0]);
          navigate('/');
          return;
        } else {
          setErrorMessage(response.message);
        }
      })
      .catch((error) => {
        
        return window.alert('Login Failed');
        
      });
    } catch (error) {
        console.error("There was an error logging in!", error);
        setErrorMessage("Login failed. Please try again.");
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
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
            <a href="/forgotpassword">Forgot password?</a>
          </div>
          <Form.Group className="mb-3">
            <Button
            onClick={handleSubmit}
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
