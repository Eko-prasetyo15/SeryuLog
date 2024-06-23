import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { setShow } from "../../Redux/action";
import { connect } from "react-redux";

const Header = ({ setShow }) => {
  const token = localStorage.getItem("token");
  return (
    <Navbar
      expand="lg"
      style={{
        fontFamily: "Source Sans Pro",
        backgroundColor: "#0EA5E9",
        color: "white",
      }}
    >
      <Navbar.Brand as={Link} to="/">
      <span className="nav-title ml-5">
          CINEMA
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarText" />
      <Navbar.Collapse id="navbarText">
        <Nav className="ml-auto">
          {token ? (
            <Nav.Link
              as={Link}
              to="/favorite"
              className="nav-link"
              style={{ color: "white", fontSize:'20px',fontFamily:'Roboto' }}
            >
              Favorite
            </Nav.Link>
          ) : (
            <Nav.Link
              className="nav-link"
              style={{ color: "white", fontSize:'20px',fontFamily:'Roboto' }}
              onClick={() => setShow(true)}
            >
              Favorite
            </Nav.Link>
          )}
          {token ? (
            <Nav.Link
              as={Link}
              to="/watchlist"
              className="nav-link"
              style={{ color: "white", fontSize:'20px',fontFamily:'Roboto' }}
            >
              Watchlist
            </Nav.Link>
          ) : (
            <Nav.Link
              className="nav-link"
              style={{ color: "white", fontSize:'20px',fontFamily:'Roboto' }}
              onClick={() => setShow(true)}
            >
              Watchlist
            </Nav.Link>
          )}
          {token && (
              <Nav.Link
              className="nav-link"
              style={{ color: "white", fontSize:'20px',fontFamily:'Roboto' }}
              onClick={() => {
                localStorage.removeItem('token')
                window.location.assign('/')
              }}
            >
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default connect(null, { setShow })(Header);
