import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById } from "../features/books/booksSlice";
import { Card, Container } from "react-bootstrap";

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
    <Container className="mt-5 justify-content-center">
      <Card style={{ width: "25rem" }}>
        <Card.Img variant="top" src={single.formats["image/jpeg"]} />
        <Card.Body>
          <Card.Title>{single.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {single.authors?.map((a) => a.name).join(", ")}
          </Card.Subtitle>
          <Card.Text>
            {single.summaries?.[0] || "No summary available."}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default SingleBook;
