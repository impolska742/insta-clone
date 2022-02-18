import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate();

  return <Container>Feed</Container>;
};

export default Feed;
