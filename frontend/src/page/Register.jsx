import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../assets/style/Register.css";
import Logo from "../assets/image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import authApi from '../api/AuthAPI';

const Register = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
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
    const { password, email, phone, fullName, dob } = data;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>0-9]/;
    const spaceRegex = /\s/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,11}$/;

    const currentDate = new Date();
    const minDob = new Date(currentDate.setFullYear(currentDate.getFullYear() - 16));

    if (spaceRegex.test(password) || spaceRegex.test(email) || spaceRegex.test(phone)) {
      setErrorMessage('No spaces are allowed in password, email, and phone.');
      return false;
    }
    if (specialCharRegex.test(fullName)) {
      setErrorMessage('Full Name cannot contain special characters or numbers.');
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setErrorMessage('Phone number must be 10 or 11 digits.');
      return false;
    }
    if (dob > minDob) {
      setErrorMessage('You must be at least 16 years old to register.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidInput(user)) return;
    try {
      authApi
      .register(user)
      .then((response) => {
        console.log(response);
        if (response.code === 200) {
          localStorage.setItem('emailSignUp', user.email);
          navigate('/verify');
        } else {
          setErrorMessage(response.message);
          return window.alert(`Sign Up Error: ${response.data.message}`);
        }
      })
      .catch((error) => {
        return window.alert('Sign Up Error: System Error');
      });
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
            Do you have an account? <Link to="/login">Login here</Link>
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
              <Form.Group className="mb-4">
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
                <Form.Label className="label" style={{ fontSize: 'small', fontWeight: 'bold', marginRight: '10px' }}>Date of Birth</Form.Label>
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
          <Button className="btn-register" style={{ backgroundColor: "#F87555", border: "none", fontSize: "small" }} type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;