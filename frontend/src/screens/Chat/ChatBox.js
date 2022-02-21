import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./ChatBox.css";

const ChatBox = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Container className="chat-box">
      {/* <FriendList friends={friends} />
      <Chat /> */}
    </Container>
  );
};

export default ChatBox;
