import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function UserNavbar({onLogout}) {
  const [showNav, setShowNav] = useState(true);

  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Social Score</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/danger-map">Danger map</Nav.Link>
            <Nav.Link href="/add_review">Add review</Nav.Link>
            <Nav.Link href="/add_crime">Register crimes</Nav.Link>
            <Nav.Link href="/add_good_deed">Register good deeds</Nav.Link>
            <Nav.Link onClick={onLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}