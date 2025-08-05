import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/imgages/logo.png";

const CustomFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container fluid className="custom-footer">
      <Row className="justify-content-between align-items-center text-center ">
        <Col md={4} className="mb-3 d-flex flex-column align-items-center">
          <img src={logo} alt="logo" height="50" className="mb-2" />
          <h5>Booksy</h5>
          <p>Your online library</p>
        </Col>
        <Col md={4} className="mb-3 mb-md-0">
          <h6>Contact Us</h6>

          <p>Email:info@booklylibrary.com</p>
          <p>Phone: +39 388 285 6895</p>
        </Col>
        <Col md={4} className="d-flex justify-content-center gap-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <i className="bi bi-twitter-x"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-3">
          <p className="mb-0">© {currentYear} Booksy. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  );
};
export default CustomFooter;
