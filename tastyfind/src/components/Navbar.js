import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">🍽️ Recipe Finder</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Search</Nav.Link>
          <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
