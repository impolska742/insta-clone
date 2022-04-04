import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiFillSetting, AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getSender } from "../../util";
import "./Chat.css";
import EditGroupChat from "../../components/EditGroupChat/EditGroupChat";
import {
  allMessagesAction,
  sendMessageAction,
} from "../../actions/chatActions";
import Loading from "../../components/Loading";
import ScrollableChat from "../../components/ScrollableChat/ScrollableChat";
import { Form } from "react-bootstrap";
import { socket } from "../../socket";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";

var selectedChatCompare = null;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Chat = ({ selectedChat, chat }) => {
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
      var timeNow = new Date.getTime();
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
    selectedChatCompare = selectedChat;
  }, [chat._id, dispatch, sendMessageSuccess, selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        selectedChatCompare === null ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // give notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  return (
    <div className="chat">
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
      <div className="chat-body">
        {loading ? <Loading /> : <ScrollableChat messages={messages} />}
      </div>
      <div className="chat-footer">
        <div className="send-message d-flex">
          <Form
            style={{ width: "100%" }}
            className="d-flex"
            onSubmit={handleSubmit}
          >
            {isTyping ? (
              <div>
                <Lottie
                  options={defaultOptions}
                  // height={50}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              </div>
            ) : (
              <></>
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
