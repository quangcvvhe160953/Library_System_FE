import React from 'react'
import NavBar from '../component/NavBar';
import TopNav from '../component/TopNav';
import {Row, Col } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';


const Home = () => {
  return (
    <div>
        <Row>
            <Col className='col-2'>
              <NavBar />
            </Col>
            <Col className='col-10'>
              <TopNav />
            </Col> 
        </Row>
    </div>
  )
}

export default Home