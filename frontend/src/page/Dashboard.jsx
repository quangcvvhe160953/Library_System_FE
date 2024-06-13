import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { Container, Row, Col } from "react-bootstrap";
import Widget from "../admin_components/Widget";

const Dashboard = () => {
  return ( 
          <div className="content-container">
             <Container>
        <Row>
          <Col xs={12} md={6} lg={3}>
            <Widget type="books" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Widget type="users" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Widget type="Week's Request" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Widget type="Fine" />
          </Col>
        </Row>

        {/* ... other dashboard content ... */}
      </Container>
          </div>
  );
};

export default Dashboard;