import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollowingAction } from "../../actions/followerActions";
import FriendsList from "../../components/FriendsList/FriendsList";
import Chat from "./Chat";
import "./ChatBox.css";

const ChatBox = ({ chatOpen }) => {
  const dispatch = useDispatch();

  const getFollowing = useSelector((state) => state.getFollowing);
  const { loading, error, success, friends } = getFollowing;

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
      />
      <Chat chatOpen={chatOpen} openChat={true} />
    </Container>
  );
};

export default ChatBox;
