import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl,
  Alert,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [dob, setDob] = useState(new Date());
  const [editDob, setEditDob] = useState(new Date());

  useEffect(() => {
    const sampleUsers = [
      { id: 1, username: 'phuc', password: '123', email: 'phuc@example.com', phone: '12345678901', fullname: 'Ng Hoang Phuc', gender: 'Male', role: 'Admin', dob: '01/01/1990' },
      { id: 2, username: 'vit', password: '456', email: 'vit@example.com', phone: '98765432101', fullname: 'Le Van Vit', gender: 'Female', role: 'User', dob: '15/05/1992' },
    ];
    setUsers(sampleUsers);
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredUsers = users.filter((user) => {
    const searchTerms = searchQuery.toLowerCase().split(' ');
    return searchTerms.every((term) => user.username.toLowerCase().includes(term) || user.fullname.toLowerCase().includes(term) || user.email.toLowerCase().includes(term));
  });

  const handleCreateModalShow = () => {
    setErrorMessage(null);
    setShowCreateModal(true);
  };

  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleEditModalShow = (user) => {
    setCurrentUser(user);
    setErrorMessage(null);
    setShowEditModal(true);
    setEditDob(new Date(user.dob.split('-').reverse().join('-')));
  };

  const handleEditModalClose = () => setShowEditModal(false);

  const isValidInput = (data) => {
    const { username, password, email, phone, fullname } = data;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>0-9]/;
    const spaceRegex = /\s/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{11}$/;

    if (spaceRegex.test(password) || spaceRegex.test(username) || spaceRegex.test(email) || spaceRegex.test(phone)) {
      setErrorMessage('No spaces are allowed in password, username, email, and phone.');
      return false;
    }
    if (specialCharRegex.test(username) || specialCharRegex.test(fullname)) {
      setErrorMessage('Username and Full Name cannot contain special characters or numbers.');
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setErrorMessage('Phone number must be 11 digits.');
      return false;
    }
    return true;
  };

  const handleCreateUser = (data) => {
    if (!isValidInput(data)) return;

    if (users.some((user) => user.id === data.id)) {
      setErrorMessage('ID already exists!');
      return;
    }
    if (users.some((user) => user.email.toLowerCase() === data.email.toLowerCase())) {
      setErrorMessage('Email already exists!');
      return;
    }

    const newId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    const newUser = { ...data, id: newId, dob: dob.toLocaleDateString('en-GB') };
    setUsers([...users, newUser]);
    setShowCreateModal(false);
  };

  const handleUpdateUser = (data) => {
    if (!isValidInput(data)) return;

    if (users.some((user) => user.id !== currentUser.id && user.email.toLowerCase() === data.email.toLowerCase())) {
      setErrorMessage('Email already exists!');
      return;
    }

    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? { ...user, ...data, dob: editDob.toLocaleDateString('en-GB') } : user
    );
    setUsers(updatedUsers);
    setShowEditModal(false);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  // Handle form submission for creating a user
  const handleCreateFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      username: formData.get('username'),
      password: formData.get('password'),
      fullname: formData.get('fullname'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      gender: formData.get('gender'),
      role: formData.get('role'),
      dob: dob.toLocaleDateString('en-GB'),
    };
    handleCreateUser(newUser);
  };

  // Handle form submission for editing a user
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
      username: formData.get('username'),
      password: formData.get('password'),
      fullname: formData.get('fullname'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      gender: formData.get('gender'),
      role: formData.get('role'),
      dob: editDob.toLocaleDateString('en-GB'),
    };
    handleUpdateUser(updatedUser);
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

      {/* User Table */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Date of Birth</th>
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
              <td>{user.gender}</td>
              <td>{user.role}</td>
              <td>{user.dob}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditModalShow(user)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create User Modal */}
      <Modal show={showCreateModal} onHide={handleCreateModalClose} centered>
  <Modal.Header closeButton>
    <Modal.Title>Create User</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

    <Form onSubmit={handleCreateFormSubmit} className="user-form">
      {/* Username */}
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control name="username" type="text" placeholder="Enter username" required />
      </Form.Group>

      {/* Password */}
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Enter password" required />
      </Form.Group>

      {/* Full Name */}
      <Form.Group controlId="formFullname">
        <Form.Label>Full Name</Form.Label>
        <Form.Control name="fullname" type="text" placeholder="Enter full name" required />
      </Form.Group>

      {/* Email */}
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" required />
      </Form.Group>

      {/* Phone */}
      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control name="phone" type="text" placeholder="Enter phone number" required />
      </Form.Group>

      {/* Date of Birth */}
      <Form.Group controlId="formDob" style={{ marginTop: '20px', marginBottom: '20px',}}>
        <Form.Label style={{ marginRight: '10px'}}>Date of Birth</Form.Label>
        <DatePicker
          selected={dob}
          onChange={(date) => setDob(date)}
          dateFormat="dd-MM-yyyy"
          className="form-control"
          required
        />
      </Form.Group>

      {/* Gender */}
      <Form.Group controlId="formGender">
        <Form.Label>Gender</Form.Label>
        <Form.Control name="gender" as="select" required>
          <option value="">Select Gender</option> {/* Add default empty option */}
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Form.Control>
      </Form.Group>

      {/* Role */}
      <Form.Group controlId="formRole">
        <Form.Label>Role</Form.Label>
        <Form.Control name="role" as="select" required>
          <option value="">Select Role</option> {/* Add default empty option */}
          <option value="Admin">Admin</option>
          <option value="ser">User</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit" block> 
        Create User
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
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                defaultValue={currentUser?.username}
                placeholder="Enter username"
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                defaultValue={currentUser?.password}
                placeholder="Enter password"
                required
              />
            </Form.Group>
            <Form.Group controlId="formFullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="fullname"
                type="text"
                defaultValue={currentUser?.fullname}
                placeholder="Enter full name"
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                defaultValue={currentUser?.email}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                defaultValue={currentUser?.phone}
                placeholder="Enter phone number"
                required
              />
            </Form.Group>
            <Form.Group controlId="formDob" style={{ marginTop: '20px', marginBottom: '20px',}}>
              <Form.Label style={{ marginRight: '10px'}}>Date of Birth</Form.Label>
              <DatePicker
                selected={editDob}
                onChange={(date) => setEditDob(date)}
                dateFormat="dd-MM-yyyy"
                className="form-control"
                required
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control name="gender" as="select" defaultValue={currentUser?.gender} required>
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control name="role" as="select" defaultValue={currentUser?.role} required>
                <option>Admin</option>
                <option>User</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update User
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManage;
