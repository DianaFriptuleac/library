import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Col, Row, Card,Container, Spinner } from "react-bootstrap";
import { fetchBooks } from "../features/books/booksSlice";
import "../css/AllBooks.css"

const AllBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, status } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
    
  }, [dispatch]);
  if (status === "loading")
    return <div className="text-center mt-5">
      <Spinner animation="border"/>
      <p className="mt-3">Caricamento in corso</p>
    </div>;

  return (
    <Container fluid className="all-books-bg d-flex justify-content-center">
      <div className="w-75 my-5 ">
      <h2 className="mb-4">Find your next book</h2>
    <Row className="g-4">
      {list.map((book) => (
        <Col key={book.id} xs={12} sm={6} md={4} lg={3} >
          
          <Card
          className="book-card h-100 shadow-sm d-flex align-items-center"
            onClick={() => navigate(`/book/${book.id}`)}
          >
            <div className="book-image-container">
            <Card.Img variant="top" src={book.formats["image/jpeg"]} className="book-image mt-3" />
            </div>
            <Card.Body>
              <Card.Title className="book-title">{book.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
    </Container>
  );
};
export default AllBooks;
