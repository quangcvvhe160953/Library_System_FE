import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../assets/style/Register.css";
import Logo from "../assets/image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    username: '',
    gender: '',
    dob: new Date(),
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleDateChange = (date) => {
    setUser({ ...user, dob: date });
  };

  const isValidInput = (data) => {
    const { username, password, email, phone, fullName } = data;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>0-9]/;
    const spaceRegex = /\s/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{11}$/;

    if (spaceRegex.test(password) || spaceRegex.test(username) || spaceRegex.test(email) || spaceRegex.test(phone)) {
      setErrorMessage('No spaces are allowed in password, username, email, and phone.');
      return false;
    }
    if (specialCharRegex.test(username) || specialCharRegex.test(fullName)) {
      setErrorMessage('Username and Full Name cannot contain special characters or numbers.');
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setErrorMessage('Phone number must be 11 digits.');
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (user.password !== user.confirmPassword) {
    //   setErrorMessage("Passwords do not match");
    //   return;
    // }

    if (!isValidInput(user)) return;

    try {
      await axios.post('/api/v1/users/register', {
        email: user.email,
        password: user.password,
        phone: user.phone,
        fullName: user.fullName,
        // username: user.username,
        gender: user.gender,
        dob: user.dob.toLocaleDateString('en-GB'),
      });

      const response = await axios.post('/', {
        username: user.email,
        password: user.password
      });

      const token = response.data.jwt;
      localStorage.setItem('token', token);
      navigate('/verify');
    } catch (error) {
      console.error("There was an error registering the user!", error);
      setErrorMessage("Registration failed. Please try again.");
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
            Do have an account? <Link to="/login">Login here</Link>
          </div>
        </div>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <div className="register-container-row">
            <div className="register-container-half">
              <Form.Group className="mb-3">
                <Form.Label className="label">Full Name</Form.Label>
                <Form.Control
                  className="field-input"
                  type="text"
                  placeholder="Full name"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <Form.Label className="label">Username</Form.Label>
                <Form.Control
                  className="field-input"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group> */}
              <Form.Group className="mb-3">
                <Form.Label className="label">Email</Form.Label>
                <Form.Control
                  className="field-input"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="label">Password</Form.Label>
                <Form.Control
                  className="field-input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="register-container-half">
              <Form.Group className="mb-3">
                <Form.Label className="label">Phone Number</Form.Label>
                <Form.Control
                  className="field-input"
                  type="text"
                  placeholder="Phone number"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" >
                <Form.Label className="label">Gender</Form.Label>
                <Form.Control
                  as="select"
                  className="field-input"
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3 date-picker-container">
                <Form.Label className="label" style={{ fontSize: 'small',fontWeight: 'bold', marginRight: '10px'}}>Date of Birth</Form.Label>
                <DatePicker
                  selected={user.dob}
                  onChange={handleDateChange}
                  className="field-input"
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  required
                />
              </Form.Group>
            </div>
          </div>
          <Button className="btn-register"  style={{
                backgroundColor: "#F87555",
                border: "none",
                fontSize: "small",
              }} type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;