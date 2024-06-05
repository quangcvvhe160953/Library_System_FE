import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Alert,
} from 'react-bootstrap';

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // State for error messages

  // Sample user data (replace with actual data fetching)
  useEffect(() => {
    const sampleUsers = [
      { id: 1, username: 'phuc', password: '123', email: 'phuc@example.com', phone: '123-456-7890', fullname: 'Ng Hoang Phuc', gender: 'Male', role: 'Admin' },
      { id: 2, username: 'vit', password: '456', email: 'vit@example.com', phone: '987-654-3210', fullname: 'Le Van Vit', gender: 'Female', role: 'User' },
    ];
    setUsers(sampleUsers);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const searchTerms = searchQuery.toLowerCase().split(' ');
    return searchTerms.every((term) => {
      return (
        user.username.toLowerCase().includes(term) ||
        user.fullname.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    });
  });

  // Handle Create Modal
  const handleCreateModalShow = () => {
    setErrorMessage(null); // Clear error message before opening the modal
    setShowCreateModal(true);
  };
  const handleCreateModalClose = () => setShowCreateModal(false);

  // Handle Edit Modal
  const handleEditModalShow = (user) => {
    setCurrentUser(user);
    setErrorMessage(null); // Clear error message before opening the modal
    setShowEditModal(true);
  };
  const handleEditModalClose = () => setShowEditModal(false);

  // Handle Create User
  const handleCreateUser = (data) => {
    // Check for ID and email duplicates
    if (users.some((user) => user.id === data.id)) {
      setErrorMessage('ID already exists!');
      return;
    }
    if (users.some((user) => user.email.toLowerCase() === data.email.toLowerCase())) {
      setErrorMessage('Email already exists!');
      return;
    }

    const newId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    const newUser = { ...data, id: newId };
    setUsers([...users, newUser]);
    setShowCreateModal(false);
  };

  // Handle Update User
  const handleUpdateUser = (data) => {
    // Check for email duplicates (excluding the current user)
    if (users.some((user) => user.id !== currentUser.id && user.email.toLowerCase() === data.email.toLowerCase())) {
      setErrorMessage('Email already exists!');
      return;
    }

    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        return { ...user, ...data };
      }
      return user;
    });
    setUsers(updatedUsers);
    setShowEditModal(false);
  };

  // Handle Delete User
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  // Handle Change Role
  const handleChangeRole = (id, newRole) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, role: newRole };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Search Bar */}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button variant="outline-secondary">Search</Button>
      </InputGroup>

      {/* Create User Button */}
      <Button variant="primary" onClick={handleCreateModalShow}>
        Create User
      </Button>

      {/* Error Message (if any) */}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {/* User List Table */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="info" style={ { marginRight: '20px' }} onClick={() => handleEditModalShow(user)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create User Modal */}
      <Modal show={showCreateModal} onHide={handleCreateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleCreateUser(Object.fromEntries(formData));
          }}>
            <Row className="mb-3">
              
              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" required />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" required />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" required />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="phone" required />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridFullname">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="fullname" required />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select name="gender" required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridRole">
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" required>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser && (
            <Form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleUpdateUser(Object.fromEntries(formData));
            }}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridId">
                  <Form.Label>ID</Form.Label>
                  <Form.Control type="number" name="id" defaultValue={currentUser.id} disabled /> {/* Disable ID field for editing */}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" defaultValue={currentUser.username} required />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" defaultValue={currentUser.password} required />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" defaultValue={currentUser.email} required />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" defaultValue={currentUser.phone} required />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridFullname">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="fullname" defaultValue={currentUser.fullname} required />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select name="gender" defaultValue={currentUser.gender} required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" defaultValue={currentUser.role} required>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserManage;