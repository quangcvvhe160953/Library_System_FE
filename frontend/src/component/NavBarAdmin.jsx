import React from 'react';
import { Link , NavLink} from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from '../page/Home';
import Logo from '../assets/image/logo.png';


const NavBarAdmin = () => {
  return (
    <Nav defaultActiveKey="/home" className="flex-column bg-light d-flex align-items-center" style={{height: '100vh'}}>
        <div className='d-flex flex-column align-items-start'>
            <Nav.Link href="/home">
                <img src={Logo} alt="logo" style={{ width: '120px', height: '74.18px', marginBottom: '50px' }} />
            </Nav.Link>           
            <Nav.Link href='dashboard' style={{color: '#8A8A8A', fontSize: 'small'}}><i class="bi bi-house"></i><span className='mx-2'>Dashboard</span></Nav.Link>
            <Nav.Link href="usermanage" style={{color: '#8A8A8A', fontSize: 'small'}}><i class="bi bi-user"></i><span className='mx-2'>Users</span></Nav.Link>
            <Nav.Link href="bookmanage" style={{color: '#8A8A8A', fontSize: 'small'}}><i class="bi bi-book"></i><span className='mx-2'>Books</span></Nav.Link>
            <Nav.Link href="bookrequestmanage" style={{color: '#8A8A8A', fontSize: 'small'}}><i class="bi bi-box2-request"></i><span className='mx-2'>Book's Requests</span></Nav.Link>
            <Nav.Link href="transactionmanage" style={{color: '#8A8A8A', fontSize: 'small'}}><i class="bi bi-box2-money"></i><span className='mx-2'>Transaction</span></Nav.Link>
        </div>
    </Nav>
  );
}

export default NavBarAdmin;