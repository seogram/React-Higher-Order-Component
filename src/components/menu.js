import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

class Menu extends React.Component {

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"><img src="/images/logo.png" width="120px" /></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );

  }
}

Menu.defaultProps = {
  authenticated : false
}

Menu.propTypes = {
  authenticated : PropTypes.bool.isRequired
}

export default Menu;
