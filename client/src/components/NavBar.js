import React, { Component } from "react";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect className="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/home">VotingCode</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/">
              <NavItem eventKey={1}>Postcodes</NavItem>
            </LinkContainer>
            <LinkContainer to="/interesting_properties">
              <NavItem eventKey={2}>Interesting Properties</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
