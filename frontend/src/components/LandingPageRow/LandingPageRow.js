import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPageRow.css";

const LandingPageRow = ({ row, landingPage = false, explore = false }) => {
  const { image, heading, subHeading } = row;

  let navigate = useNavigate();

  return (
    <Row className="d-flex" id="landing-page-row">
      <Col className="landing-page-col">
        <h3>{heading}</h3>
        <p>{subHeading}</p>
        {landingPage && (
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
        )}

        {explore && (
          <button
            onClick={() => navigate("/register")}
            type="button"
            class="btn btn-outline-light"
          >
            Explore
          </button>
        )}
      </Col>
      <Col className="landing-page-col">
        <img className="row-img" src={image} alt="Post SVG" />
      </Col>
    </Row>
  );
};

export default LandingPageRow;
