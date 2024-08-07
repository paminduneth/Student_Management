import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar style={{ backgroundColor: '#007bff' }} variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Student Management</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/add">Create Student</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;



