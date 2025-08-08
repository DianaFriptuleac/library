import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById } from "../features/books/booksSlice";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../css/SingleBook.css";

const SingleBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { single, status } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [dispatch, id]);

  if (status === "loading" || !single)
    return <div className="text-center mt-5">Loading...</div>;

  return (
    <Container fluid className="bg-singleBook">
      <Row className="justify-content-center mt-5">
        <Col className="image-col">
          <img src={single.formats["image/jpeg"]} alt="book_img" />
        </Col>
        <Col className="summary_col">
          <h4 className="mt-3">{single.title}</h4>
          <h5 className="mb-3 text-muted">
            {single.authors?.map((a) => a.name).join(", ")}
          </h5>

          <p>{single.summaries?.[0] || "No summary available."}</p>
        </Col>
      </Row>
    </Container>
  );
};
export default SingleBook;
