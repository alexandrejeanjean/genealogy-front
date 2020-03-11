import React from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { withUser } from '../../store/UserProvider';

import LocalStorageService from '../../services/LocalStorageService';

import './navbar.css';
import dna from '../../assets/dna.svg';

type Props = {
  isLogged: boolean;
  setIsLogged: Function;
};

const Navigationbar = ({ isLogged, setIsLogged }: Props) => {
  let history = useHistory();

  const logout = async () => {
    try {
      LocalStorageService._clearToken();
      setIsLogged(false);
      history.push('/');
    } catch (err) {
      if (err) {
        return err;
      }
    }
  };

  return isLogged ? (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
      <Navbar.Brand href="#home">
        <img src={dna} alt="genealogy-logo" className="dna-logo-navbar" />
        <span className="ml-2 main-color bold">Genealogy</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto mr-5">
          <Nav.Link eventKey={2} href="/dashboard" className="bold">
            Life tree
          </Nav.Link>
          <NavDropdown title="Actions" id="collasible-nav-dropdown" className="bold">
            <NavDropdown.Item href="/family">New family</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  ) : null;
};

export default withUser(Navigationbar);
