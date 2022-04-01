import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiFillSetting, AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import { getSender } from "../../util";
import "./Chat.css";
import EditGroupChat from "../../components/EditGroupChat/EditGroupChat";

const Chat = ({ chat }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!chat.isGroupChat) {
      setSender(getSender(userInfo, chat.users));
    }
  }, [chat.isGroupChat, chat.users, userInfo]);

  return (
    <div className="chat">
      <EditGroupChat
        open={open}
        handleClose={handleClose}
        prevGroupName={chat?.chatName}
        prevUsers={chat?.users}
      />
      <div className="chat-header">
        {chat.isGroupChat ? (
          <>
            <strong>{chat.chatName}</strong>
            <AiFillSetting
              size={25}
              onClick={handleOpen}
              className="edit-group"
            />
          </>
        ) : (
          <>
            <div className="user-info d-flex align-items-center">
              <Avatar className="chat-avatar" src={sender?.displayPhoto} />
              <strong>{sender?.name}</strong>
            </div>
          </>
        )}
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <div className="send-message d-flex">
          <input
            className="send-message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Send message."
          />
          <AiOutlineSend className="send-message-icon">Submit</AiOutlineSend>
        </div>
      </div>
    </div>
  );
};

export default Chat;
