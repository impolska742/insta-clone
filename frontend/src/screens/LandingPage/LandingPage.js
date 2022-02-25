import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LandingPageRow from "../../components/LandingPageRow/LandingPageRow";
import { row1 } from "../../landingPageDetails";

const LandingPage = () => {
  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/feed");
    }
  }, [userInfo, navigate]);

  return (
    <Container>
      <LandingPageRow row={row1} landingPage={true} />
    </Container>
  );
};

export default LandingPage;
