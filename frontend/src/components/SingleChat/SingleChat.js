import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getConversationMessagesAction,
  sendMessageAction,
} from "../../actions/conversationActions";
import { postDetails } from "../../util";
import { socket } from "../../socket.js";

const SingleChat = ({ conversation }) => {
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [media, setMedia] = useState("");
  const [photoMessage, setPhotoMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const sendMessage = useSelector((state) => state.sendMessage);

  const { userInfo } = userLogin;

  const {
    loading: sendMessageLoading,
    success: sendMessageSuccess,
    error: sendMessageError,
  } = sendMessage;

  const sendMessageButton = (e) => {
    e.preventDefault();
    if (message) {
      dispatch(sendMessageAction(id, message, media));
    }
    setMessage("");
  };

  const getConversationMessages = useSelector(
    (state) => state.getConversationMessages
  );

  const { loading, success, error, messages } = getConversationMessages;

  useEffect(() => {
    dispatch(getConversationMessagesAction(id));
    socket.emit("setup", userInfo);
    socket.on("connection", () => setSocketConnected(true));
  }, [dispatch, id, userInfo]);

  return (
    <div className="single-chat">
      <div className="single-chat-header">Header</div>
      <div className="single-chat-messages">
        {messages?.map((message) => {
          return <p key={message._id}>{message.content}</p>;
        })}
      </div>
      <Form onSubmit={sendMessageButton} className="d-flex">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send message"
          />
          <Form.Control
            type="file"
            onChange={(e) =>
              postDetails(e.target.files[0], setMedia, setPhotoMessage)
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SingleChat;
