/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import Loading from "../../components/Loading";
import "../LoginScreen/LoginScreen.css";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userInfoWhileLoggingIn } = userLogin;

  const userCreate = useSelector((state) => state.userCreate);
  const { error, loading, userInfo } = userCreate;

  useEffect(() => {
    if (userInfo || userInfoWhileLoggingIn) {
      navigate("/feed");
    }

    if (error) {
      setMessage(error);
    }

    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [navigate, userInfo, message, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
    } else {
      setMessage("");
      dispatch(register(email, userName, password));
    }
  };

  return (
    <>
      <Container id="first-container">
        <button href="/" className="login-logo">
          Instagram
        </button>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          {message && (
            <div class="alert alert-dismissible alert-danger">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
              ></button>
              <strong>Oh snap!</strong>{" "}
              <a href="#" class="alert-link">
                {message}
              </a>
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>

        {loading && <Loading />}

        {error && (
          <div class="alert alert-dismissible alert-danger">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
            ></button>
            <strong>Oh snap!</strong>{" "}
            <a href="#" class="alert-link">
              {error}
            </a>
          </div>
        )}
      </Container>

      <Container id="second-container">
        <h4>Have an account?</h4>
        <Button href="/login" type="button" variant="dark">
          Log In
        </Button>
      </Container>
    </>
  );
};

export default RegisterScreen;
