import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/imgages/logo.png"
import "../css/Home.css"
const CustomNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="md"className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="/">
        <img src={logo} alt="logo_booksy" height="40" className="d-inline-block align-top"/> </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="/allbooks">Shop</Nav.Link>
            <Nav.Link href="#">Contacts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default CustomNavbar;
