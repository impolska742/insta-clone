import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getSender } from "../../util";
import "./Chat.css";
import ShowProfile from "../../components/ShowUserProfile/ShowProfile";

const Chat = ({ chat }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!chat.isGroupChat) {
      setSender(getSender(userInfo, chat.users));
    }
  }, [chat.isGroupChat, chat.users, userInfo]);

  return (
    <div className="chat">
      <div className="chat-header">
        {chat.isGroupChat ? (
          <strong>{chat.chatName}</strong>
        ) : (
          <>
            <div className="user-info">
              <Avatar src={sender?.displayPhoto} />
              <strong>{sender?.name}</strong>
            </div>
            {open ? (
              <AiFillEye
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(!open)}
              />
            ) : (
              <AiFillEyeInvisible
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(!open)}
              />
            )}
            <ShowProfile
              open={open}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
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
