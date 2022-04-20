import { Avatar } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import { isMessageSentByMe, isSameUser, setLeftMargin } from "../../util";

const ScrollableChat = ({ messages }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { id } = userInfo;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div>
      {messages &&
        messages.map((m, i) => {
          return (
            <div key={m._id} style={{ display: "flex" }}>
              {!isSameUser(messages, m, i) &&
                !isMessageSentByMe(id, messages, i) && (
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ name: m.sender.name })}
                  >
                    <Avatar
                      style={{ marginTop: "7px" }}
                      src={m.sender?.displayPhoto}
                    />
                  </OverlayTrigger>
                )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === id ? "#0eb586" : "#303030"
                  }`,
                  marginLeft: setLeftMargin(messages, m, i, id),
                  marginTop: isSameUser(messages, m, i) ? "10" : "7",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {m.content}
              </span>
            </div>
          );
        })}

      <div ref={messagesEndRef} />
    </div>
  );
};

const renderTooltip = ({ name }) => (
  <Tooltip id="button-tooltip" name={name}>
    {name}
  </Tooltip>
);

export default ScrollableChat;
