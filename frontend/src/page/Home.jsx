import React from 'react';
import NavBar from '../component/NavBar';
import TopNav from '../component/TopNav';
import { Row, Col } from 'react-bootstrap';
import ListBook from '../page/ListBook';

const Home = () => {
  return (
    <div>
        <Row>
            <Col className='col-2'>
              <NavBar />
            </Col>
            <Col className='col-10'>
              <TopNav />
              <ListBook />
            </Col> 
        </Row>
    </div>
  )
}

export default Home;
