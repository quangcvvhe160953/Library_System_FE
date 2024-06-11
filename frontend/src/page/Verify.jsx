import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "../assets/style/Verify.css";
import Logo from "../assets/image/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Thay thế Redirect bằng useNavigate

const Verify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate(); // Khởi tạo hook useNavigate
  const email = localStorage.getItem("email"); // Giả sử email được lưu trong localStorage khi đăng nhập

  const handleChange = (e, index) => {
    const newOtp = otp.slice(0, index) + e.target.value + otp.slice(index + 1);
    setOtp(newOtp);
  
    if (e.target.value === '') {
      // If the current input is empty, focus on the previous input (if available)
      if (index > 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    } else if (index < 4) {
      // If a number is entered and the current input is not the last one, focus on the next input
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    console.log(otp);
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/user/verify-otp", {
        email,
        otp,
      });
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      navigate("/verify-status"); // Chuyển hướng về trang xác minh thành công sau khi xác minh OTP thành công
    } catch (error) {
      console.error("There was an error verifying the OTP!", error);
    }
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

  const handleResendOtp = async () => {
    try {
      await axios.post("/api/v1/user/resendOTP", { email });
      alert("OTP has been resent to your email");
    } catch (error) {
      console.error("There was an error resending the OTP!", error);
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
                  id={`otp-input-${index}`}
                  className="input-item"
                  type="text"
                  maxLength="1"
                  value={otp[index] || ""}
                  onChange={(e) => handleChange(e, index)}
                  style={{ fontSize: "small" }}
                />
              ))}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Button
              className="btn-verify"
              type="submit"
              style={{
                backgroundColor: "#F87555",
                border: "none",
                fontSize: "small",
              }}
            >
              Verify
            </Button>
          </Form.Group>
          <div className="resend">
            <span>
            <Button disabled style={{ fontSize: "small" , backgroundColor: "white", color: "black", border: "none"}} >
             Not yet received? </Button>    
              <Button className="btn-resend" style={{ fontSize: "small" , backgroundColor: "white", color: "black", border: "none"}} onClick={handleResendOtp} disabled={isButtonDisabled}>
                Resend ({resendOTPTimer})
              </Button>
            </span>
            <Button className="btn-back" href="/register" style={{ fontSize: "small" , backgroundColor: "white", color: "black", border: "none"}} >Back</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Verify;
