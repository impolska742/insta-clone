/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./LoginScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import Loading from "../../components/Loading";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/feed");
    }
  }, [userInfo, navigate, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Container id="first-container">
        <Link to="/" id="login-logo">
          Instagram
        </Link>
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <h4>Don't have an account?</h4>
        <Button href="/register" type="button" variant="dark">
          Sign up
        </Button>
      </Container>
    </>
  );
};

export default LoginScreen;
