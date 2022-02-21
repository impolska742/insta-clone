import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPageRow.css";

const LandingPageRow = ({ row }) => {
  const { image, heading, subHeading } = row;

  let navigate = useNavigate();

  return (
    <Row className="d-flex" id="landing-page-row">
      <Col className="landing-page-col">
        <h3>{heading}</h3>
        <p>{subHeading}</p>
        <div className="button-box">
          <button
            onClick={() => navigate("/login")}
            type="button"
            class="btn btn-outline-secondary login-btn"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            type="button"
            class="btn btn-outline-light"
          >
            Sign-Up
          </button>
        </div>
      </Col>
      <Col className="landing-page-col">
        <img className="row-img" src={image} alt="Post SVG" />
      </Col>
    </Row>
  );
};

export default LandingPageRow;
