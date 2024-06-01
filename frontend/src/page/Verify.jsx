import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../assets/style/Verify.css';
import Logo from '../assets/image/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Thay thế Redirect bằng useNavigate

const Verify = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate(); // Khởi tạo hook useNavigate
  const email = localStorage.getItem('email'); // Giả sử email được lưu trong localStorage khi đăng nhập

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/user/verify-otp', { email, otp });
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      navigate('/verify-status'); // Chuyển hướng về trang xác minh thành công sau khi xác minh OTP thành công
    } catch (error) {
      console.error('There was an error verifying the OTP!', error);
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post('/api/v1/user/resendOTP', { email });
      alert('OTP has been resent to your email');
    } catch (error) {
      console.error('There was an error resending the OTP!', error);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify">
        <div className="verify-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="verify-title">
          <h6>Verification</h6>
          <div className="sub-title">Check your E-mail for OTP</div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="label">Enter your OTP here</Form.Label>
            <div className="input-container">
              {[...Array(5)].map((_, index) => (
                <Form.Control
                  key={index}
                  className="input-item"
                  type="text"
                  maxLength="1"
                  value={otp[index] || ''}
                  onChange={(e) => handleChange(e)}
                  style={{ fontSize: 'small' }}
                />
              ))}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Button className="btn-verify" type="submit" style={{ backgroundColor: '#F87555', border: 'none', fontSize: 'small' }}>Verify</Button>
          </Form.Group>
          <div className="resend">
            <span>Not yet received?<a href="/" onClick={handleResendOtp}>Resend</a></span>
            <a href="#">Back</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Verify;
