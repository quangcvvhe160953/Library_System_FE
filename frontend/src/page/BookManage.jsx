import React, { useState } from 'react';
import { Button, Table, Modal, Form, InputGroup, FormControl, Alert } from 'react-bootstrap';

const BookManage = () => {
  const [books, setBooks] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateModalShow = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleEditModalShow = (book) => {
    setCurrentBook(book);
    setShowEditModal(true);
  };
  const handleEditModalClose = () => setShowEditModal(false);

  const handleDetailsModalShow = (book) => {
    setCurrentBook(book);
    setShowDetailsModal(true);
  };
  const handleDetailsModalClose = () => setShowDetailsModal(false);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isValidInput = (data) => {
    const { title, author, price, copies, copiesLeft, category, publisher, year } = data;
    if (!title || !author || !price || !copies || !copiesLeft || !category || !publisher || !year) {
      setErrorMessage('All fields except PDF URL are required.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleCreateBook = (data) => {
    if (!isValidInput(data)) return;

    if (books.some((book) => book.title.toLowerCase() === data.title.toLowerCase())) {
      setErrorMessage('Book with the same title already exists!');
      return;
    }

    const newId = books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;
    const newBook = { ...data, id: newId, review: '' }; // Add review field
    setBooks([...books, newBook]);
    setShowCreateModal(false);
  };

  const handleUpdateBook = (data) => {
    if (!isValidInput(data)) return;

    if (books.some((book) => book.id !== currentBook.id && book.title.toLowerCase() === data.title.toLowerCase())) {
      setErrorMessage('Book with the same title already exists!');
      return;
    }

    const updatedBooks = books.map((book) =>
      book.id === currentBook.id ? { ...book, ...data } : book
    );
    setBooks(updatedBooks);
    setShowEditModal(false);
  };

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const handleCreateFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newBook = {
      image: formData.get('image'),
      title: formData.get('title'),
      author: formData.get('author'),
      price: formData.get('price'),
      copies: formData.get('copies'),
      copiesLeft: formData.get('copiesLeft'),
      category: formData.get('category'),
      publisher: formData.get('publisher'),
      year: formData.get('year'),
      pdf: formData.get('pdf'),
    };
    handleCreateBook(newBook);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedBook = {
      image: formData.get('image'),
      title: formData.get('title'),
      author: formData.get('author'),
      price: formData.get('price'),
      copies: formData.get('copies'),
      copiesLeft: formData.get('copiesLeft'),
      category: formData.get('category'),
      publisher: formData.get('publisher'),
      year: formData.get('year'),
      pdf: formData.get('pdf'),
    };
    handleUpdateBook(updatedBook);
  };

  return (
    <div>
      <h1>Book Management</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by title, author, or category"
          aria-label="Search books"
          aria-describedby="basic-addon2"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </InputGroup>
      <Button style={{color: 'white', backgroundColor: '#F87555'}} onClick={handleCreateModalShow}>
        Create Book
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Copies</th>
            <th>Copies Left</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>
                <img
                  src={book.image}
                  alt={book.title}
                  style={{ width: '50px', height: '50px' }}
                />
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>{book.copies}</td>
              <td>{book.copiesLeft}</td>
              <td>{book.category}</td>
              <td>
                <Button variant="info" onClick={() => handleDetailsModalShow(book)}>
                  View Details
                </Button>{' '}
                <Button variant="warning" onClick={() => handleEditModalShow(book)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create Book Modal */}
      <Modal show={showCreateModal} onHide={handleCreateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleCreateFormSubmit}>
            <Form.Group controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" name="image" placeholder="Enter image URL" />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="Enter title" />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" placeholder="Enter author" />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" placeholder="Enter price" step="0.01" />
            </Form.Group>
            <Form.Group controlId="formCopies">
              <Form.Label>Copies</Form.Label>
              <Form.Control type="number" name="copies" placeholder="Enter total copies" />
            </Form.Group>
            <Form.Group controlId="formCopiesLeft">
              <Form.Label>Copies Left</Form.Label>
              <Form.Control type="number" name="copiesLeft" placeholder="Enter copies left" />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" placeholder="Enter category" />
            </Form.Group>
            <Form.Group controlId="formPublisher">
              <Form.Label>Publisher</Form.Label>
              <Form.Control type="text" name="publisher" placeholder="Enter publisher" />
            </Form.Group>
            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control type="number" name="year" placeholder="Enter year of publication" />
            </Form.Group>
            <Form.Group controlId="formPdf">
              <Form.Label>PDF URL</Form.Label>
              <Form.Control/>
              <Form.Label>PDF URL</Form.Label>
              <Form.Control type="text" name="pdf" placeholder="Enter PDF URL (optional)" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Book Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Group controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" name="image" defaultValue={currentBook?.image} />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" defaultValue={currentBook?.title} />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" defaultValue={currentBook?.author} />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" defaultValue={currentBook?.price} step="0.01" />
            </Form.Group>
            <Form.Group controlId="formCopies">
              <Form.Label>Copies</Form.Label>
              <Form.Control type="number" name="copies" defaultValue={currentBook?.copies} />
            </Form.Group>
            <Form.Group controlId="formCopiesLeft">
              <Form.Label>Copies Left</Form.Label>
              <Form.Control type="number" name="copiesLeft" defaultValue={currentBook?.copiesLeft} />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" defaultValue={currentBook?.category} />
            </Form.Group>
            <Form.Group controlId="formPublisher">
              <Form.Label>Publisher</Form.Label>
              <Form.Control type="text" name="publisher" defaultValue={currentBook?.publisher} />
            </Form.Group>
            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control type="number" name="year" defaultValue={currentBook?.year} />
            </Form.Group>
            {/* <Form.Group controlId="formPdf">
              <Form.Label>PDF URL</Form.Label>
              <Form.Control type="text" name="pdf" defaultValue={currentBook?.pdf} />
            </Form.Group> */}
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Book Details Modal */}
      {currentBook && (
        <Modal show={showDetailsModal} onHide={handleDetailsModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Book Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={currentBook.image}
              alt={currentBook.title}
              style={{ width: '100%', height: 'auto', marginBottom: '15px' }}
            />
            <p><strong>Title:</strong> {currentBook.title}</p>
            <p><strong>Author:</strong> {currentBook.author}</p>
            <p><strong>Price:</strong> ${currentBook.price}</p>
            <p><strong>Copies:</strong> {currentBook.copies}</p>
            <p><strong>Copies Left:</strong> {currentBook.copiesLeft}</p>
            <p><strong>Category:</strong> {currentBook.category}</p>
            <p><strong>Publisher:</strong> {currentBook.publisher}</p>
            <p><strong>Year:</strong> {currentBook.year}</p>
            {currentBook.pdf && (
              <p>
                <strong>PDF:</strong> <a href={currentBook.pdf} target="_blank" rel="noopener noreferrer">View PDF</a>
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDetailsModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default BookManage;