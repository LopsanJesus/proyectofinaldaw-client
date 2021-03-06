import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import appConfig from "../../config/app";
import { NavDropdown, Spinner } from "react-bootstrap";
import "./TopBar.scss";
import { useTranslation } from "react-i18next";
import { GET_ME } from "../../queries/user";
import { useQuery } from "@apollo/client";
import { saveUserInfo } from "../../actions/userInfo";

const TopBar = ({ user, saveUserInfo }) => {
  const { t } = useTranslation();
  const src = "../../../full-apple.png";

  const { loading, data } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });

  if (!loading && data && localStorage.getItem("auth-token") && !user) {
    saveUserInfo({ ...data.getMe });
  }

  return (
    <Navbar bg="light" variant="light" expand="md" sticky="top">
      <Navbar.Brand>
        <Link to="/">
          <img src="/treelang-title.png" alt={appConfig.title} />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item className="mr-auto">
            <Link to="/discover">{t("discover.link")}</Link>
          </Nav.Item>
          {!loading && user && (
            <>
              <Nav.Item className="mr-auto">
                <Link to="/my-forest">{t("myForest")}</Link>
              </Nav.Item>
              <Nav.Item className="mr-auto">
                <Link to="/my-history">{t("myHistory")}</Link>
              </Nav.Item>
            </>
          )}
        </Nav>
        <Nav id="right-nav">
          {!loading && user ? (
            <>
              <Navbar.Text className="Username">
                {user && user.name}
              </Navbar.Text>
              <NavDropdown
                title={
                  <span>
                    <img className="profile-image" src={src} alt="User Pic" />
                  </span>
                }
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profile" className="mr-auto">
                  {t("profile")}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/logout" className="mr-auto">
                  {t("logout")}
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : loading ? (
            <Nav.Link className="mr-auto">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Nav.Link>
          ) : (
            <>
              <Nav.Link className="mr-auto">
                <Link to="/login">{t("form.login")}</Link>
              </Nav.Link>
            </>
          )}
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

const mapDispatchToProps = (dispatch) => ({
  saveUserInfo: (user) => dispatch(saveUserInfo(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
