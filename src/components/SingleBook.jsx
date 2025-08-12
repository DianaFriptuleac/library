import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById } from "../features/books/booksSlice";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { BsCart, BsCartFill } from "react-icons/bs";
import "../css/SingleBook.css";

const SingleBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { single, status } = useSelector((state) => state.books);
  const [inCart, setInCart] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [dispatch, id]);

  if (status === "loading" || !single)
    return <div className="text-center mt-5">Loading...</div>;

  const handleToggleShop = () => {
    if (!inCart) {
      setAlert("Book added to cart");
      setInCart(true);
    } else {
      setAlert("Book removed from cart");
      setInCart(false);
    }
    setTimeout(() => setAlert(""), 3000); //rimuove alert
  };

  return (
    <Container fluid className="bg-singleBook">
      {alert && (
        <Row className="justify-content-center mt-3">
          <Col md={6}>
            <Alert
              variant={inCart ? "success" : "danger"}
              dismissible
              onClose={() => setAlert("")}
            >
              {alert}
            </Alert>
          </Col>
        </Row>
      )}
      <Row className="justify-content-center mt-5">
        <Col className="image-col">
          <img src={single.formats["image/jpeg"]} alt="book_img" />
          <button
            type="submit"
            className={`btn ${
              inCart ? "btn-danger" : "btn-outline-danger"
            } p-2 mt-3`}
            onClick={handleToggleShop}
          >
            {inCart ? (
              <BsCartFill className="shop-icon" />
            ) : (
              <BsCart className="shop-icon" />
            )}
          </button>
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
