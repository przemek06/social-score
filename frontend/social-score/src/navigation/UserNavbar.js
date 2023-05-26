import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItemDiv from '../components/navigation-components/NavItemDiv';

const NavRow = ({onAddAppointemnt}) => {
    return (
        <div class="flex-row">
            <NavItemDiv path="/view_appointments" text="View all appointments" />
        </div>
    );
};


export default function UserNavbar() {
  const [showNav, setShowNav] = useState(true);

  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Social Score</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/danger-map">Danger map</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}