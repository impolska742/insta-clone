import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ChatList from "../../components/ChatList/ChatList";
import Chat from "./Chat";
import "./ChatBox.css";
const ChatBox = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  useEffect(() => {}, [selectedChat]);
  return (
    <Container className="chat-box">
      <ChatList setSelectedChat={setSelectedChat} />
      {selectedChat ? (
        <Chat chat={selectedChat} selectedChat={selectedChat} />
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
