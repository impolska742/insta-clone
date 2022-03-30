import React from "react";
import { Container } from "react-bootstrap";
import ChatList from "../../components/ChatList/ChatList";
import "./ChatBox.css";

const ChatBox = ({ chatOpen }) => {
  return (
    <Container className="chat-box">
      <ChatList />
    </Container>
  );
};

export default ChatBox;
