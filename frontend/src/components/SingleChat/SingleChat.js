import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleChat = ({ conversation }) => {
  const { id } = useParams();

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const sendMessage = useSelector((state) => state.useSelector);
  const {
    loading: sendMessageLoading,
    success: sendMessageSuccess,
    error: sendMessageError,
  } = sendMessage;

  const handleSubmit = () => {};

  return (
    <div className="single-chat">
      <div className="single-chat-header">Header</div>
      <div className="single-chat-messages">
        {conversation?.messages?.map((message) => {
          return <p key={message._id}></p>;
        })}
      </div>
      <Form onSubmit={handleSubmit} className="d-flex">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send message"
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
