import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from '../page/Home';
import Logo from '../assets/image/logo.png';


const NavBar = () => {
  return (

    <Nav defaultActiveKey="/home" className="flex-column bg-light d-flex align-items-center" style={{height: '100vh'}}>
        <div className='d-flex flex-column align-items-start'>
            <Nav.Link href="/home">
                <img src={Logo} alt="logo" style={{ width: '120px', height: '74.18px', marginBottom: '50px' }} />
            </Nav.Link>
            
            <Nav.Link href="/" style={{color: '#8A8A8A', fontSize: 'small'}}><i class="bi bi-house"></i><span className='mx-2'>Home</span></Nav.Link>
            <Nav.Link href="/search" style={{color: '#8A8A8A', fontSize: 'small'}}><i class="bi bi-search"></i><span className='mx-2'>Search</span></Nav.Link>
            <Nav.Link href="/my-shelf" style={{color: '#8A8A8A', fontSize: 'small'}}><i class="bi bi-bookshelf"></i><span className='mx-2'>My Shelf</span></Nav.Link>
            <Nav.Link href="/contribute" style={{color: '#8A8A8A', fontSize: 'small'}}><i class="bi bi-box2-heart"></i><span className='mx-2'>Contribute</span></Nav.Link>
        </div>
    </Nav>

  );
}

export default NavBar;
