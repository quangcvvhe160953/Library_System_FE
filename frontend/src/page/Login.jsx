import React from "react";
import {Form, Button} from "react-bootstrap";
import "../assets/style/Login.css";
import Logo from "../assets/image/logo.png";
import {Link, Route, Routes} from "react-router-dom";
import Register from "../page/Register";

function Login() {
  return (
    <div className="login-container">
      <div className="login">
        <div className="login-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="login-title">
          <h6>Welcome back !</h6>
          <div className="sub-title">Don't have an account ? <Link to="/register">Register here</Link></div>
        </div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control className="field-input" type="email" placeholder="Email" style={{fontSize: 'small'}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control className="field-input" type="password" placeholder="Password" style={{fontSize: 'small'}} />
          </Form.Group>
          <div className="forgot-password">
            <a href="/">Forgot password?</a>
          </div>
          <Form.Group className="mb-3">
            <Button className="btn-login" type="submit" style={{backgroundColor: '#F87555', border: 'none', fontSize: 'small'}}>Login</Button>
          </Form.Group>
          <div className="or">Or</div>
          <a href="#" className="btn-login-google"><i class="bi bi-google"></i><span className="mx-2">Login with Google</span></a>
        </Form>
      </div>
    </div>
  );
}

export default Login;
