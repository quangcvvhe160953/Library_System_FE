import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Logo from '../assets/image/logo.png';

const NavBarAdmin = ({ handleNavClick }) => {
  const handleClick = (navItem) => {
    handleNavClick(navItem);
  };

  return (
    <Nav defaultActiveKey="/home" className="flex-column bg-light d-flex align-items-center" style={{ height: '100vh', paddingTop: '20px' }}>
      <div className='d-flex flex-column align-items-start'>
        <Link to="/home">
          <img src={Logo} alt="logo" style={{ width: '120px', height: '74.18px', marginBottom: '50px' }} />
        </Link>
        <NavLink to="/admin/dashboard" onClick={() => handleClick('dashboard')} className="nav-link" style={{ color: '#8A8A8A', fontSize: '14px', marginBottom: '10px' }}>
          <i className="bi bi-house"></i>
          <span className='mx-2'>Dashboard</span>
        </NavLink>
        <NavLink to="/admin/usermanage" onClick={() => handleClick('usermanage')} className="nav-link" style={{ color: '#8A8A8A', fontSize: '14px', marginBottom: '10px' }}>
          <i className="bi bi-person"></i>
          <span className='mx-2'>Users</span>
        </NavLink>
        <NavLink to="/admin/bookmanage" onClick={() => handleClick('bookmanage')} className="nav-link" style={{ color: '#8A8A8A', fontSize: '14px', marginBottom: '10px' }}>
          <i className="bi bi-book"></i>
          <span className='mx-2'>Books</span>
        </NavLink>
        <NavLink to="/admin/bookrequestmanage" onClick={() => handleClick('bookrequestmanage')} className="nav-link" style={{ color: '#8A8A8A', fontSize: '14px', marginBottom: '10px' }}>
          <i className="bi bi-receipt"></i>
          <span className='mx-2'>Book's Requests</span>
        </NavLink>
        <NavLink to="/admin/bookborrow" onClick={() => handleClick('bookborrow')} className="nav-link" style={{ color: '#8A8A8A', fontSize: '14px', marginBottom: '10px' }}>
          <i className="bi bi-handbag"></i>
          <span className='mx-2'>Borrowed Books</span>
        </NavLink>
      </div>
    </Nav>
  );
}

export default NavBarAdmin;