import React from "react";
import "../assets/style/ListBook.css"; // Ensure you create appropriate CSS for styling
import bookCover from "../assets/image/book-cover.png";

const ListBook = () => {
    const books = [
      {
        title: "The Design of Everyday Things",
        author: "Don Norman",
        year: 1988,
        rating: 4.5,
        price: 50000,
        status: "In-Shelf",
      },
      {
        title: "The Design of Everyday Things",
        author: "Don Norman",
        year: 1988,
        rating: 4.5,
        price: 50000,
        status: "Borrowed",
      },
      {
        title: "The Design of Everyday Things",
        author: "Don Norman",
        year: 1988,
        rating: 4.5,
        price: 50000,
        status: "Ran-out",
      },
      {
        title: "The Design of Everyday Things",
        author: "Don Norman",
        year: 1988,
        rating: 4.5,
        price: 50000,
        status: "In-Shelf",
      },
      {
        title: "The Design of Everyday Things",
        author: "Don Norman",
        year: 1988,
        rating: 4.5,
        price: 50000,
        status: "In-Shelf",
      },
    ];
  
    const getStatusClass = (status) => {
      switch (status) {
        case "In-Shelf":
          return "status-in-shelf";
        case "Borrowed":
          return "status-borrowed";
        case "Ran-out":
          return "status-ran-out";
        default:
          return "";
      }
    };
  
    return (
      <div className="book-list">
        {books.map((book, index) => (
          <div className="book-card" key={index}>
            <img
              src={bookCover} // Replace with actual path to book cover image
              alt={book.title}
              className="book-cover"
            />
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}, {book.year}</p>
              <div className="book-status-price">
                <span className={`book-status ${getStatusClass(book.status)}`}>
                  {book.status}
                </span>
                <span className="book-price">{book.price.toLocaleString()} VND</span>
              </div>
              <p className="book-rating">4.5/5</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ListBook;