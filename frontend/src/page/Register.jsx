import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../assets/style/Register.css";
import Logo from "../assets/image/logo.png";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate instead of Redirect
import axios from 'axios';

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post('/api/v1/user/register', {
        email: user.email,
        password: user.password,
        phone: user.phone,
        fullName: user.fullName,
      });

      // Sau khi đăng ký thành công, tự động đăng nhập
      const response = await axios.post('/', {
        username: user.email,
        password: user.password
      });

      const token = response.data.jwt;
      localStorage.setItem('token', token);
      navigate('/verify'); // Navigate to the verification page after successful registration
    } catch (error) {
      console.error("There was an error registering the user!", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register">
        <div className="register-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="register-title">
          <h6>Registration</h6>
          <div className="sub-title">
            Do have an account ? <Link to="/login">Login here</Link>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="label">Full name</Form.Label>
            <Form.Control
              className="field-input"
              type="text"
              placeholder="Full name"
              style={{ fontSize: "small" }}
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">College Email ID</Form.Label>
            <Form.Control
              className="field-input"
              type="email"
              placeholder="Email"
              name="email"
              style={{ fontSize: "small" }}
              value={user.email}
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
              value={user.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">Confirm Password</Form.Label>
            <Form.Control
              className="field-input"
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              style={{ fontSize: "small" }}
              value={user.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button
              className="btn-register"
              type="submit"
              style={{
                backgroundColor: "#F87555",
                border: "none",
                fontSize: "small",
              }}
            >
              Register
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
