import React from 'react';
import { Form, Button } from 'react-bootstrap';
import "../assets/style/Register.css";
import Logo from "../assets/image/logo.png";
import {Link} from "react-router-dom";

const SignUp = () => {
  return (
    <div className="register-container">
      <div className="register">
        <div className="register-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="register-title">
          <h6>Registration</h6>
          <div className="sub-title">Do have an account ? <Link to="/login">Login here</Link></div>
        </div>
        <Form>
        <Form.Group className="mb-3">
            <Form.Label className="label">Full name</Form.Label>
            <Form.Control className="field-input" type="text" placeholder="Full name" style={{fontSize: 'small'}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">College Email ID</Form.Label>
            <Form.Control className="field-input" type="email" placeholder="Email" style={{fontSize: 'small'}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control className="field-input" type="password" placeholder="Password" style={{fontSize: 'small'}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">Confirm Password</Form.Label>
            <Form.Control className="field-input" type="password" placeholder="Confirm password" style={{fontSize: 'small'}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button className="btn-register" type="submit" style={{backgroundColor: '#F87555', border: 'none', fontSize: 'small'}}>Register</Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default SignUp