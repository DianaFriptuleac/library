import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import logo from "../assets/imgages/logo.png";
import "../css/Home.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchBooks } from "../features/books/booksSlice";
import { FaRegCircleUser } from "react-icons/fa6";
const CustomNavbar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    dispatch(searchBooks(search));
    navigate("/allbooks");
    setSearch("");
  };
  return (
    <Navbar collapseOnSelect expand="md" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="/" className="me-auto">
          <img
            src={logo}
            alt="logo_booksy"
            height="40"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form className="d-flex mx-auto nav-serach" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Write title or author"
              className="me-2 ms-5"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" variant="outline-light">
              Search
            </Button>
          </Form>

          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="/allbooks">Shop</Nav.Link>
            <Nav.Link href="#">Contacts</Nav.Link>
            <Nav.Link href="/auth">
              <FaRegCircleUser />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default CustomNavbar;
