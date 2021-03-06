import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";
import SearchBar from './SearchBar';


const PublicNavBar = () => {
    return (
    <Navbar bg="light" expand="lg" justify-content-betweend>
      <Navbar.Brand>
        <img src={logo} alt="Apple TV" width="50px" />
      </Navbar.Brand>
      <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">WatchNow</Nav.Link>
          <Nav.Link as={Link} to="/upcoming">Upcoming</Nav.Link>
          <Nav.Link as={Link} to="/top_rated">Top Rated</Nav.Link>


        </Nav>
      {/* <SearchBar /> */}
    </Navbar>
  );
    
}

export default PublicNavBar;