import React from "react";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Routes, Route } from "react-router-dom";
import "../assets/style/TopBar.css";
import UserLogo from "../assets/image/user_149071.png";

const TopNavAdmin = () => {
  return (
    <div className="d-flex" style={{ padding: "10px 10px 0 0" }}>
      <Nav className="ms-auto">
        <NavDropdown className="btnInfo" title="Admin" id="collapsible-nav-dropdown" >
          <NavDropdown.Item href="/adminprofile">Profile</NavDropdown.Item>
          <NavDropdown.Item href="/">Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default TopNavAdmin;