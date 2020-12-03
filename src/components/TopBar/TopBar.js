import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import appConfig from "../../config/app";
import { NavDropdown } from "react-bootstrap";
import "./TopBar.scss";
import { useTranslation } from "react-i18next";

const TopBar = ({ user }) => {
  const { t } = useTranslation();
  const src = "../../../full-apple.png";

  return (
    <Navbar bg="light" variant="light" expand="sm" sticky="top">
      <Navbar.Brand>
        <Link to="/">{appConfig.title}</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="mr-auto">
            <Link to="/my-forest">{t('my_forest')}</Link>
            {/* <Link to="/my-forest">My Forest</Link> */}
          </Nav.Link>
          <Nav.Link className="mr-auto">
            <Link to="/about">{t('about')}</Link>
          </Nav.Link>
        </Nav>
        <Nav id="right-nav">
          <Navbar.Text>{user && user.name}</Navbar.Text>
          <NavDropdown
            title={
              <span>
                <img className="profile-image" src={src} alt="User Pic" />
              </span>
            }
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item className="mr-auto">
              <Link to="/profile">Profile</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="mr-auto">
              <Link to="/logout">Log Out</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

export default connect(mapStateToProps, null)(TopBar);
