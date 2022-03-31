import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ChatList from "../../components/ChatList/ChatList";
import Chat from "./Chat";
import "./ChatBox.css";
const ChatBox = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  return (
    <Container className="chat-box">
      <ChatList selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
      {selectedChat ? (
        <Chat chat={selectedChat} />
      ) : (
        <div className="chat">
          <center>
            <h4>Send messages to your friends.</h4>
          </center>
        </div>
      )}
    </Container>
  );
};

export default ChatBox;
