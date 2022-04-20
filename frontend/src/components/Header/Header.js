import React, { useEffect, useState } from "react";
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import "./Header.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaFacebookMessenger } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";
import CreatePost from "../CreatePost/CreatePost";
import { MdNotificationsActive } from "react-icons/md";

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [width, setWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    if (window.confirm("Do you want to logout?")) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <Navbar id="nav-bar" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <div className="logo-container">
          <InstagramIcon className="header-logo-icon" fontSize="large" />
          <div className="break"></div>
          <Navbar.Brand href="/" className="header-logo">
            Instagram
          </Navbar.Brand>
        </div>
        {userInfo ? (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="m-auto" id="header-search">
                <Form>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    id="header-input"
                    aria-label="Search"
                  />
                </Form>
              </Nav>

              <Nav id="icons-nav">
                <Nav.Link className="d-flex toggle-header-link" href="/chat">
                  <FaFacebookMessenger size={25} />
                  {width < 992 && <h5>Send Message</h5>}
                </Nav.Link>

                <Nav.Link
                  className="d-flex toggle-header-link"
                  href="#"
                  onClick={handleOpen}
                >
                  <BiMessageSquareAdd size={30} />
                  {width < 992 && <h5>Create A Post</h5>}
                </Nav.Link>

                <Nav.Link
                  className="d-flex toggle-header-link"
                  href="/notifications"
                >
                  <MdNotificationsActive size={30} />
                  {width < 992 && <h5>Notifications</h5>}
                </Nav.Link>

                <CreatePost open={open} handleClose={handleClose} />

                <Nav.Link className="d-flex toggle-header-link" href="/explore">
                  <MdOutlineExplore size={30} />
                  {width < 992 && <h5>Explore</h5>}
                </Nav.Link>

                <Nav.Link
                  className="d-flex toggle-header-link"
                  href={`/view-profile/${userInfo.id}`}
                >
                  <BsFillPersonFill size={30} />
                  {width < 992 && <h5>View Profile</h5>}
                </Nav.Link>

                <Nav.Link
                  className="d-flex toggle-header-link"
                  href="#"
                  onClick={logoutHandler}
                >
                  <FiLogOut size={30} />
                  {width < 992 && <h5>Logout</h5>}
                </Nav.Link>
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
