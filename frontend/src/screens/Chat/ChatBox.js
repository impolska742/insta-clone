import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollowingAction } from "../../actions/followerActions";
import FriendsList from "../../components/FriendsList/FriendsList";
import Chat from "./Chat";
import "./ChatBox.css";

const ChatBox = () => {
  const [chat, setChat] = useState(null);

  const dispatch = useDispatch();

  const getFollowing = useSelector((state) => state.getFollowing);
  const { loading, error, success, friends } = getFollowing;

  // console.log(friends);

  useEffect(() => {
    dispatch(getUserFollowingAction());
  }, [dispatch]);

  return (
    <Container className="chat-box">
      <FriendsList
        friends={friends}
        loading={loading}
        error={error}
        success={success}
        chat={chat}
        setChat={setChat}
      />
      <Chat chat={chat} />
    </Container>
  );
};

export default ChatBox;
