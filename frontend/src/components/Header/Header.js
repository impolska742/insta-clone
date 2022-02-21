import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import "./Header.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaFacebookMessenger, FaHeart } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar id="nav-bar" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <div className="logo-container">
          <InstagramIcon className="header-logo-icon" fontSize="large" />
          <Navbar.Brand href="/" className="header-logo">
            Instagram
          </Navbar.Brand>
        </div>
        {userInfo ? (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="m-auto">
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    id="header-input"
                    aria-label="Search"
                  />
                </Form>
              </Nav>

              <Nav>
                <Nav.Link href="/login">
                  <FaFacebookMessenger size={25} />
                </Nav.Link>
                <Nav.Link href="/login">
                  <FaHeart size={25} />
                </Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <Nav id="not-user-nav">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
