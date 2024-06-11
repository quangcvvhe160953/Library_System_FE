import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import NavBarAdmin from '../component/NavBarAdmin';
import TopNavAdmin from '../component/TopNavAdmin';
import Dashboard from './Dashboard';
import UserManage from './UserManage';
import BookManage from './BookManage';
import BookRequestManage from './BookRequestManage';
import BookBorrowManage from './BookBorrowManage';

const Admin = () => {
  const [content, setContent] = useState('dashboard'); // Default content is the Dashboard

  const renderContent = () => {
    switch (content) {
      case 'dashboard':
        return <Dashboard />;
      case 'usermanage':
        return <UserManage />;
      case 'bookmanage':
        return <BookManage />;
      case 'bookrequestmanage':
        return <BookRequestManage />;
      case 'bookborrow':
        return <BookBorrowManage />;
      default:
        return null;
    }
  };

  const handleNavClick = (navItem) => {
    setContent(navItem);
  };

  return (
    <div>
      <Row>
        <Col className='col-2'>
          <NavBarAdmin handleNavClick={handleNavClick} />
        </Col>
        <Col className='col-10'>
          <TopNavAdmin />
          {renderContent()}
        </Col>
      </Row>
    </div>
  );
};

export default Admin;