import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ChatList from "../../components/ChatList/ChatList";
import LandingPageRow from "../../components/LandingPageRow/LandingPageRow";
import { row4 } from "../../landingPageDetails";
import Chat from "./Chat";
import "./ChatBox.css";
const ChatBox = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    const updateDimensions = () => {
      setWidth(window.innerWidth);
      if (width > 768) setShowList(true);
    };
    if (selectedChat !== null) {
      setShowList(false);
    }
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [selectedChat, width]);

  return (
    <Container className="chat-box">
      <ChatList
        showList={showList}
        width={width}
        setSelectedChat={setSelectedChat}
      />
      {selectedChat ? (
        <Chat
          showList={showList}
          setShowList={setShowList}
          width={width}
          chat={selectedChat}
          selectedChat={selectedChat}
        />
      ) : (
        <div
          style={{
            display: `${width < 768 ? (showList ? "none" : "block") : "block"}`,
          }}
          className="chat"
        >
          <LandingPageRow row={row4} chatBox={true} />
        </div>
      )}
    </Container>
  );
};

export default ChatBox;
