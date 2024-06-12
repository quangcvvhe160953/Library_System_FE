import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, InputGroup } from 'react-bootstrap';
import { PasswordContext } from '../context/PasswordContext';
import Logo from "../assets/image/logo.png";
import { useNavigate } from 'react-router-dom';
import authApi from '../api/AuthAPI';

const ResetPassword = () => {
  const { newPassword, setNewPassword, otp, setOtp, email, setEmail  } = useContext(PasswordContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle reset password and OTP verification here
    if (newPassword.trim().length === 0 || newPassword.length < 6) {
      alert('Password must be at least 6 characters long and cannot contain spaces.');
      return;
    }
    // Continue with password reset process
    const otpData = {
      otp,
      email,
      newPassword,
    };
    authApi
    .verifyOTPForgotPassword(otpData)
    .then((response) => {
      console.log(response);
      if (response.code === 200) {
        navigate('/login');
        return window.alert('Change Password Successfully');
      }
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        return window.alert(`Error: ${error.response.data.message}`);
      } else {
        return window.alert('An error occurred during password reset.');
      }
    });

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [resendOTPTimer, setResendOTPTimer] = useState(120);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (resendOTPTimer === 0) {
        clearInterval(interval);
        setIsButtonDisabled(false);
        return;
      }
      setResendOTPTimer(resendOTPTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendOTPTimer]);

  const handleResendOtp = () => {
    // Handle OTP resend functionality here
    // You can implement the logic to send the OTP again
    authApi
    .resendOTP(email)
    .then((response) => {
      console.log(response);
      if (response.code === 200) {
        return window.alert('A new OTP has been sent to your email.');
      }
    })
    .catch((error) => {
      return window.alert('OTP System error');
    });
    setResendOTPTimer(120);
    setIsButtonDisabled(true);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row>
        <Col>
          <Card style={{ padding: '2rem', borderRadius: '10px' }}>
            <Card.Body>
              <div className="text-center mb-4">
                <img 
                  src={Logo}
                  alt="Logo"
                  style={{ width: '100px' }}
                />
              </div>
              <Card.Title className="text-center mb-4">Reset Password</Card.Title>
              <Card.Text className="text-center mb-4">
                Enter the OTP and choose a new password for your account.
              </Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <Form.Control 
                      type="text"
                      placeholder="Enter OTP" 
                      value={otp} 
                      onChange={(e) => setOtp(e.target.value)} 
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <Form.Control 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Your new password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                    />
                  </InputGroup>
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  style={{ backgroundColor: '#F87555', border: 'none', width: '100%', marginBottom: '20px', fontSize: 'small' }}   
                >
                  Reset password
                </Button>
              </Form>
              <Button 
                style={{ height: '35px', fontSize: 'small', fontWeight: 'bold', margin: '0 auto' }} 
                variant="outline-dark" 
                className="w-100" 
                href="/login"
              >
                Back to Login
              </Button>
              <Button
                style={{ height: '35px', fontSize: 'small', fontWeight: 'bold', marginTop: '20px' }}
                variant="outline-primary"
                className="w-100"
                onClick={handleResendOtp}
              >
                Resend OTP
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;