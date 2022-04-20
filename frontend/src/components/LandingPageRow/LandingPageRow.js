import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPageRow.css";

const LandingPageRow = ({
  row,
  landingPage = false,
  explore = false,
  notifications = false,
  chatBox = false,
}) => {
  const { image, heading, subHeading } = row;

  let navigate = useNavigate();

  return (
    <Row
      // eslint-disable-next-line no-useless-concat
      className={"d-flex " + `${chatBox && "flex-column"}`}
      id="landing-page-row"
    >
      <Col className="landing-page-col">
        <h3>{heading}</h3>
        <p>{subHeading}</p>
        {landingPage && (
          <div className="button-box">
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="btn btn-outline-secondary login-btn"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              type="button"
              className="btn btn-outline-light"
            >
              Sign-Up
            </button>
          </div>
        )}

        {explore && (
          <button
            onClick={() => navigate("/explore")}
            type="button"
            className="btn btn-outline-light"
          >
            Explore
          </button>
        )}

        {notifications && (
          <button
            onClick={() => navigate("/feed")}
            type="button"
            className="btn btn-outline-light"
          >
            Home
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
