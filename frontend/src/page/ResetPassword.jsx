import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, InputGroup } from 'react-bootstrap';

import Logo from "../assets/image/logo.png";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý việc reset password ở đây
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row>
        <Col>
          <Card style={{ padding: '2rem', borderRadius: '10px' }}>
            <Card.Body>
              <div className="text-center mb-4">
                <img 
                  src={Logo}
                  alt="Logo"
                  style={{ width: '100px' }}
                />
              </div>
              <Card.Title className="text-center mb-4">Reset Password</Card.Title>
              <Card.Text className="text-center mb-4">
                Choose a new password for your account.
              </Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <Form.Control 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Your new password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <Form.Control 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your new password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                  </InputGroup>
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  
                  style={{ backgroundColor: '#F87555', border: 'none', width: '100%', marginBottom : '20px', fontSize: 'small' }}   
                >
                  Reset password
                </Button>
              </Form>
              <Button style={{ height: '35px', fontSize: 'small', fontWeight: 'bold', margin
              : '0 auto'}} variant="outline-dark" className="w-100" href="/login">
              Back to Login
            </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;