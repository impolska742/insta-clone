import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getConversationAction } from "../../actions/conversationActions";
import SingleChat from "../../components/SingleChat/SingleChat";
import "./Chat.css";

const Chat = ({ chatOpen }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const getConversation = useSelector((state) => state.getConversation);

  const {
    loading: getConversationLoading,
    success: getConversationSuccess,
    conversation,
    error: getConversationError,
  } = getConversation;

  console.log(conversation);

  useEffect(() => {
    if (chatOpen) {
      dispatch(getConversationAction(id));
    }
  }, [chatOpen, dispatch, id]);

  return (
    <>
      {chatOpen ? (
        <div className="chat">
          <SingleChat conversation={conversation} />
        </div>
      ) : (
        <div className="chat">Chat</div>
      )}
    </>
  );
};

export default Chat;
