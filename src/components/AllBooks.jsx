import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Col, Row, Card, Container, Spinner } from "react-bootstrap";
import { fetchBooks } from "../features/books/booksSlice";
import "../css/AllBooks.css";

const AllBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, status, next, previous } = useSelector((state) => state.books);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBooks(page));
  }, [dispatch, page]);

  const handleNext = () => setPage((p) => p + 1);
  const handlePrevious = () => setPage((p) => Math.max(1, p - 1));

  if (status === "loading") return;
  <Spinner animation="border" />;

  return (
    <Container fluid className="all-books-bg d-flex justify-content-center">
      <div className="w-75 my-5 ">
        <h2 className="mb-4">Find your next book</h2>
        <Row className="g-4">
          {list.map((book) => (
            <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="book-card h-100 shadow-sm d-flex align-items-center"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <div className="book-image-container">
                  <Card.Img
                    variant="top"
                    src={book.formats["image/jpeg"]}
                    className="book-image mt-3"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="book-title">{book.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="mt-4 d-flex justify-content-center align-items-center gap-3">
          <button
            className="btn btn-outline-dark"
            disabled={!previous}
            onClick={handlePrevious}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            className="btn btn-outline-dark px-4"
            disabled={!next}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  );
};
export default AllBooks;
