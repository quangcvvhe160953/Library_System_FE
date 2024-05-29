import React from 'react'
import { Form, Button } from 'react-bootstrap';
import '../assets/style/Verify.css';
import Logo from '../assets/image/logo.png';

const Verify = () => {
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
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="label">Enter your OTP here</Form.Label>
            <div className='input-container'>
                <Form.Control className="input-item" type="text"  style={{fontSize: 'small'}} />
                <Form.Control className="input-item" type="text"  style={{fontSize: 'small'}} />
                <Form.Control className="input-item" type="text"  style={{fontSize: 'small'}} />
                <Form.Control className="input-item" type="text"  style={{fontSize: 'small'}} />
                <Form.Control className="input-item" type="text"  style={{fontSize: 'small'}} />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Button className="btn-verify" type="submit" style={{backgroundColor: '#F87555', border: 'none', fontSize: 'small'}}>Verify</Button>
          </Form.Group>
          <div className="resend">
            <span>Not yet received?<a href="/">Resend</a></span>
            <a href="#">Back</a>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Verify