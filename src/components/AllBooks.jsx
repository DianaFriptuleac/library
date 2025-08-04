import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Col, Row, Card,Container } from "react-bootstrap";
import { fetchBooks } from "../features/books/booksSlice";
const AllBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, status } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  if (status === "loading")
    return <div className="text-center mt-5">Loading...</div>;

  return (
    <Container>
    <Row className="g-3 mt-5">
      {list.map((book) => (
        <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
          <Card
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/book/${book.id}`)}
          >
            <Card.Img variant="top" src={book.formats["image/jpeg"]} />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </Container>
  );
};
export default AllBooks;
