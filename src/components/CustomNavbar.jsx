import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
const CustomNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="black" data-bs-theme="dark"fixed="top">
      <Container fluid>
        <Navbar.Brand href="#home">Books</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Shop</Nav.Link>
            <Nav.Link href="#">Contacts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default CustomNavbar;
