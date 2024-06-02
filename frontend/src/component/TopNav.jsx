import React from "react";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Routes, Route } from "react-router-dom";
import "../assets/style/TopBar.css";
import UserLogo from "../assets/image/user_149071.png";
import Login from "../page/Login";

const TopNav = () => {
  return (
    <div className="d-flex" style={{ padding: "10px 10px 0 0" }}>
      <Nav className="me-auto">
        <Form className="d-flex">
          <div className="d-flex" style={{
            border: "1px solid #DEDEE1",
            borderRadius: "50px",
            height: "35px",
            backgroundColor: "#fff",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
          }}>
            <Form.Select
              aria-label="Default select example"
              style={{ 
                width: "70px",
                border: "none",
                borderRadius: "0",
                backgroundColor: "transparent",
                fontSize: "small",
                height: "35px"
              }}
            >
              <option>All</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control
              type="text"
              placeholder="Search"
              aria-label="Search"
              style={{
                border: "none",
                backgroundColor: "transparent",
                fontSize: "small",
                height: "35px",
                fontSize: "small",
                borderRadius: "0"
              }}
            />
            <Button style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#F87555',
              borderRadius: "0",
              fontSize: 'small'
            }}>
              <i class="bi bi-search"></i>
            </Button>
          </div>
        </Form>
      </Nav>
      <Nav>
        <Link className="btnLogin" to="/login" >
          Login
        </Link>
        <NavDropdown className="btnInfo" title="Admin" id="collapsible-nav-dropdown">
          <NavDropdown.Item href="#">Profile</NavDropdown.Item>
          <NavDropdown.Item href="#">Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default TopNav;
