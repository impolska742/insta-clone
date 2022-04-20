import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiFillBackward, AiFillSetting, AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getSender } from "../../util";
import "./Chat.css";
import EditGroupChat from "../../components/EditGroupChat/EditGroupChat";
import {
  allMessagesAction,
  deleteNormalChatAction,
  sendMessageAction,
} from "../../actions/chatActions";
import ScrollableChat from "../../components/ScrollableChat/ScrollableChat";
import { Form } from "react-bootstrap";
import { socket } from "../../socket";
import animationData from "../../animations/typing.json";
import Lottie from "react-lottie";
import { MdDeleteForever } from "react-icons/md";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Chat = ({ selectedChat, chat, width, showList, setShowList }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const allMessages = useSelector((state) => state.allMessages);
  const sendMessage = useSelector((state) => state.sendMessage);

  useEffect(() => {
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [userInfo]);

  const typingHandler = (e) => {
    setMessage(e.target.value);

    // Typing Indicator
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const { loading } = allMessages;
  const { success: sendMessageSuccess } = sendMessage;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessageAction(chat._id, message));
    setMessage("");
    socket.emit("stop typing", selectedChat._id);
  };

  useEffect(() => {
    if (!chat.isGroupChat) {
      setSender(getSender(userInfo, chat.users));
    }
  }, [chat.isGroupChat, chat.users, userInfo]);

  useEffect(() => {
    dispatch(allMessagesAction(chat._id, setMessages));
  }, [chat._id, dispatch, sendMessageSuccess, selectedChat]);

  const deleteCurrentChat = () => {
    if (window.confirm("Do you want to delete this chat ?")) {
      dispatch(deleteNormalChatAction(chat?._id));
    }
    window.location.reload(false);
  };

  return (
    <div
      style={{
        display: `${width < 768 ? (showList ? "none" : "block") : "block"}`,
      }}
      className="chat"
    >
      <EditGroupChat
        open={open}
        handleClose={handleClose}
        prevGroupName={chat?.chatName}
        prevUsers={chat?.users}
        chatId={chat?._id}
      />
      <div className="chat-header">
        {chat.isGroupChat ? (
          <>
            <strong>{chat.chatName}</strong>
            <div className="d-flex align-items-center">
              <AiFillSetting
                className="icon-btn"
                size={25}
                onClick={handleOpen}
              />
              {width < 768 && (
                <AiFillBackward
                  size={30}
                  className="icon-btn"
                  onClick={() => setShowList(!showList)}
                >
                  Go Back ◀◀
                </AiFillBackward>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="user-info d-flex align-items-center">
              <Avatar className="chat-avatar" src={sender?.displayPhoto} />
              <strong>{sender?.name}</strong>
            </div>
            <div className="d-flex align-items-center">
              <MdDeleteForever
                className="icon-btn"
                size={25}
                onClick={deleteCurrentChat}
              />
              {width < 768 && (
                <AiFillBackward
                  size={30}
                  className="icon-btn"
                  onClick={() => setShowList(!showList)}
                >
                  Go Back ◀◀
                </AiFillBackward>
              )}
            </div>
          </>
        )}
      </div>

      <div className="chat-body">
        {!loading && (
          <ScrollableChat
            isTyping={isTyping}
            messages={messages}
            sender={sender}
          />
        )}
      </div>

      <div className="chat-footer">
        <div className="send-message d-flex">
          <Form
            style={{ width: "100%" }}
            className="d-flex"
            onSubmit={handleSubmit}
          >
            {isTyping && (
              <div>
                <Lottie options={defaultOptions} width={50} />
              </div>
            )}
            <input
              className="send-message-input"
              value={message}
              onChange={typingHandler}
              type="text"
              placeholder="Send message."
            />
            <AiOutlineSend
              className="send-message-icon"
              onClick={handleSubmit}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
