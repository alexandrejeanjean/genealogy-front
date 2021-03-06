import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { setAuthorization } from "../../api";
import { withUser } from "../../store/UserProvider";
import LocalStorageService from "../../services/LocalStorageService";
import { tree } from "../../assets/imgPath";
import "./navbar.scss";

type Props = {
  isLogged: boolean;
  setIsLogged: Function;
};

const Navigationbar = ({ isLogged, setIsLogged }: Props) => {
  let history = useHistory();

  const logout = async () => {
    try {
      LocalStorageService._clearToken();
      setAuthorization(null);
      setIsLogged(false);
      history.push("/");
    } catch (err) {
      if (err) {
        return err;
      }
    }
  };

  return isLogged ? (
    <Navbar
      className="navbar"
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="light"
    >
      <Navbar.Brand href="#home">
        <img src={tree} alt="genealogy-logo" className="dna-logo-navbar" />
        <span className="ml-2 main-color bold">Family tree</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto mr-5">
          <Nav.Link eventKey={2} as={Link} to="/dashboard" className="bold">
            My Families
          </Nav.Link>
          <Nav.Link
            eventKey={2}
            as={Link}
            to="/"
            onClick={logout}
            className="bold"
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  ) : null;
};

export default withUser(Navigationbar);
