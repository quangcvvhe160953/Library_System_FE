import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const BookRequestManage = () => {
  const [requests, setRequests] = useState([
    {
      requestId: 1,
      customer: "john_doe",
      bookTitle: "The Great Gatsby",
      dateRequested: "2024-06-05",
      dateExpired: "2024-06-15",
      status: "Pending",
      dateAccepted: null,
      dateCancelled: null,
    },
    {
      requestId: 2,
      customer: "jane_smith",
      bookTitle: "To Kill a Mockingbird",
      dateRequested: "2024-06-05",
      dateExpired: "2024-06-20",
      status: "Pending",
      dateAccepted: null,
      dateCancelled: null,
    },
    {
      requestId: 3,
      customer: "alex_johnson",
      bookTitle: "Pride and Prejudice",
      dateRequested: "2022-06-10",
      dateExpired: "2022-06-25",
      status: "Cancelled",
      dateAccepted: null,
      dateCancelled: "2022-06-12",
    },
    {
      requestId: 4,
      customer: "emma_davis",
      bookTitle: "The Catcher in the Rye",
      dateRequested: "2022-06-15",
      dateExpired: "2022-06-30",
      status: "Taked",
      dateAccepted: "2022-06-17",
      dateCancelled: null,
    },
    // Add more request objects as needed
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [acceptForm, setAcceptForm] = useState({
    dateBorrow: new Date().toISOString().slice(0, 10), // Set Date Borrow as the current date
    dateEnd: new Date(Date.now() + 12096e5).toISOString().slice(0, 10), // Set Date End as 2 weeks later
    isbn: "",
  });

 
  const handleAcceptFormSubmit = (e) => {
    e.preventDefault();

    const updatedRequests = requests.map((request) => {
      if (request.requestId === selectedRequest.requestId) {
        return {
          ...request,
          status: "Taked", // Update status to "Taked" on accept
          dateAccepted: new Date().toISOString().slice(0, 10), // Set the date accepted
          acceptedBy: "admin", // Add who accepted the request (admin in this case)
        };
      }
      return request;
    });

    setRequests(updatedRequests);
    setSelectedRequest(null);
    setAcceptForm({
      dateBorrow: new Date().toISOString().slice(0, 10), 
      dateEnd: new Date(Date.now() + 12096e5).toISOString().slice(0, 10), 
      isbn: "",
    });
    setShowModal(false);
  };

  const handleAcceptFormChange = (e) => {
    const { name, value } = e.target;
    setAcceptForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRequestDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

 

  const handleAcceptRequest = () => {
    const updatedRequests = requests.map((request) => {
      if (request.requestId === selectedRequest.requestId) {
        return {
          ...request,
          status: "Admin Accept",
          dateAccepted: new Date().toISOString().slice(0, 10),
        };
      }
      return request;
    });
    setRequests(updatedRequests);
    setShowModal(false); // Close the modal after accepting the request
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getActionText = (request) => {
    switch (request.status) {
      case "Pending":
        return (
          <Button onClick={() => handleRequestDetails(request)}>
            View Detail
          </Button>
        );
      case "Taked": // Updated to "Taked" for accepted requests
        return `admin accepted on ${request.dateAccepted}`; // Show who accepted and when
      case "Returned":
        return "Returned";
      case "Cancelled":
        return `${request.customer} cancelled on ${request.dateCancelled}`; // Show who cancelled and when
      default:
        return "";
    }
  };
  return (
    <div>
      <h2>Book Requests</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Customer</th>
            <th>Book Title</th>
            <th>Date Requested</th>
            <th>Date Expired</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.requestId}>
              <td>{request.requestId}</td>
              <td>{request.customer}</td>
              <td>{request.bookTitle}</td>
              <td>{request.dateRequested}</td>
              <td>{request.dateExpired}</td>
              <td>{request.status}</td>
              <td>{getActionText(request)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Request ID: {selectedRequest?.requestId}</p>
          <p>Customer: {selectedRequest?.customer}</p>
          <p>Book Title: {selectedRequest?.bookTitle}</p>
          <p>Date Requested: {selectedRequest?.dateRequested}</p>
          <p>Date Expired: {selectedRequest?.dateExpired}</p>
          <p>Status: {selectedRequest?.status}</p>
          {selectedRequest?.status === "Pending" && (
            <div>
              <h4>Accept Request</h4>
              <Form onSubmit={handleAcceptFormSubmit}>
                {/* Accept form fields */}
                <Form.Group controlId="formDateBorrow">
                  <Form.Label>Date Borrow</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateBorrow"
                    value={acceptForm.dateBorrow}
                    onChange={handleAcceptFormChange}
                    required
                    disabled // Disable the Date Borrow field
                  />
                </Form.Group>
                <Form.Group controlId="formDateEnd">
                  <Form.Label>Date End</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateEnd"
                    value={acceptForm.dateEnd}
                    onChange={handleAcceptFormChange}
                    required
                    disabled // Disable the Date End field
                  />
                </Form.Group>
                <Form.Group controlId="formIsbn">
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control
                    type="text"
                    name="isbn"
                    value={acceptForm.isbn}
                    onChange={handleAcceptFormChange}
                    required
                  />
                </Form.Group>
                <Button style={{ marginTop: "10px", color: "white", backgroundColor: "#007bff" }} variant="primary" type="submit">
                  Accept Request
                </Button>
              </Form>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookRequestManage;