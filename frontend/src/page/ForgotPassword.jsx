import React, { useContext, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import Logo from "../assets/image/logo.png";
import { useNavigate } from 'react-router-dom';
import authApi from '../api/AuthAPI';
import {PasswordContext} from '../context/PasswordContext';

const ForgotPassword = () => {
  const {email, setEmail} = useContext(PasswordContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendEmail = {
      email,
    };
    // Regular expression to validate email format
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  // Check if the email follows the correct format
  if (!emailRegex.test(email)) {
    window.alert('Please enter a valid email address');
    return;
  }
    authApi
      .sendOTPForgotPassword(sendEmail) // Replace with your send OTP API call
      .then((response) => {
        if (response.code === 200) {
          window.alert('We have sent you a code to verify your email address');
          navigate('/resetpassword');
        } else {
          window.alert(`Error: ${response.message}`);
        }
      })
      .catch((error) => {
        window.alert('Error: System Error');
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px', padding: '20px', borderRadius: '10px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>
        <Card.Body>
          <div className="text-center mb-4">
            <img src={Logo} alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
            <h5>Forgot password</h5>
          </div>
          <p className="text-center mb-4">
            Enter the email you used to create your account so we can send you instructions on how to reset your password.
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ marginBottom: '10px', fontSize: 'small', fontWeight: 'bold' }}>Your email:</Form.Label>
              <Form.Control style={{ marginBottom: '50px' }} type="email" placeholder="username@collegename.ac.in" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Button
              type="submit"
              style={{
                backgroundColor: "#F87555",
                border: "none",
                fontSize: "small",
              }}
              className="w-100 mb-3"
            >
              Send
            </Button>
            <Button style={{ height: '35px', fontSize: 'small', fontWeight: 'bold' }} variant="outline-dark" className="w-100" href="/login">
              Back to Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ForgotPassword;