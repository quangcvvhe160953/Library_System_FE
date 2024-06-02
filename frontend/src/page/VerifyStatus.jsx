import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate từ react-router-dom
import '../assets/style/Verify.css';
import Logo from '../assets/image/logo.png';

const VerifySuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Kiểm tra xác minh thành công ở đây, có thể dựa vào một state hoặc các điều kiện khác
    const isVerified = true; // Ví dụ: giả định đã xác minh thành công

    // Nếu xác minh thành công, thực hiện chuyển hướng bằng navigate
    if (isVerified) {
      // Sử dụng navigate
      navigate("/");
    }
  }, []);

  return (
    <div className="verify-container">
      <div className="verify">
        <div className="verify-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="verify-title">
          <h6>Verification</h6>
          <div className="sub-title">Thank you</div>
        </div>
        <div className='verify-success'>
            <h6>You are verified</h6>
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" fill="#21c179" r="10"/><path clip-rule="evenodd" d="m16.6766 8.58327c.1936.19698.1908.51355-.0062.70708l-5.7054 5.60545c-.1914.1881-.4972.1915-.6927.0078l-2.67382-2.5115c-.20128-.189-.21118-.5055-.02212-.7067.18906-.2013.50548-.2112.70676-.0222l2.32368 2.1827 5.3628-5.26888c.1969-.19353.5135-.19073.707.00625z" fill="#fff" fill-rule="evenodd"/></svg>
        </div>
        <a className="btn-login" href="#">Login</a>
      </div>
    </div>
  );
}

export default VerifySuccess;
