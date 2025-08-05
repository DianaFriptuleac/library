import { Carousel, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/books/booksSlice";
import Quotes from "./Quotes";
import "../css/Home.css";
import book from "../assets/imgages/bg-book.jpg"
const Home = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.books);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  //3 libri per il carosello
  const carouselBooks = [];
  for (let i = 0; i < list.length; i += 4) {
    carouselBooks.push(list.slice(i, i + 4));
  }
  if (status === "loading")
    return <div className="text-center mt-5">Loading...</div>;
  return (
   <>
   <div className="home-image-section">
    <img src={book} alt="book-image" className="home-image" />
   </div>
      <div className="home-carousel-section">
        <Container>
          <Carousel activeIndex={index} onSelect={handleSelect} interval={4000} fade>
            {carouselBooks.map((group, idx) => (
              <Carousel.Item key={idx}>
                <Row className="justify-content-center gap-4">
                  {group.map((book) => (
                    <Col lg={2} md={4} key={book.id} className="text-center">
                      <img
                        className="home-carousel-img"
                        src={book.formats["image/jpeg"]}
                        alt={book.title}
                      />
                      <h5 className="mt-2">{book.title}</h5>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </div>

      <Quotes />
    </>
  );
};
export default Home;