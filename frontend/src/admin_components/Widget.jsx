import React, { useEffect, useState } from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { FaUser, FaBook, FaHandHoldingUsd, FaMoneyBillWave } from 'react-icons/fa'; // Font Awesome icons
import { AiOutlineArrowUp } from "react-icons/ai"
import UserService from '../service/UserService';
import BookService from '../service/BookService';

const Widget = ({ type }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const diff =20;
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        switch (type) {
          case "users":
            result = await UserService.getAllUser();
            break;
          case "books":
            result = await BookService.getAllBooks();
            break;
          // case "earning":
          //   result = await libraryService.getTotalEarnings();
          //   break;
          // case "balance":
          //   result = await libraryService.getBalance();
          //   break;
          default:
            throw new Error("Invalid widget type");
        }

        setData(result.data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type]);
  
  const iconMap = {
    user: <FaUser className="icon" style={{ color: "crimson" }} />,
    book: <FaBook className="icon" style={{ color: "goldenrod" }} />,
    earning: <FaMoneyBillWave className="icon" style={{ color: "green" }} />,
    balance: <FaHandHoldingUsd className="icon" style={{ color: "purple" }} />,
  };

  const title = type.toUpperCase();
  const linkText = {
    user: "See all users",
    book: "View all book",
    earning: "View net earnings",
    balance: "See details",
  }[type];

  return (
    <Card className="widget">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Title className="mb-0">{title}</Card.Title>
          {isLoading ? (
            <span className="text-muted">loading</span>
          ) : error ? (
            <span className="text-danger">{error}</span>
          ) : (
            <>
              <Card.Text className="h5">
                {type === "earning" || type === "balance" ? "$" : ""}
                {data?.count || data}
              </Card.Text>
              <Card.Link href="#" className="text-muted">
                {linkText}
              </Card.Link>
            </>
          )}
        </div>
        <div className="d-flex align-items-center">
          <span className="percentage text-success me-2">
            <AiOutlineArrowUp/> {diff} %
          </span>
          {iconMap[type]}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Widget;