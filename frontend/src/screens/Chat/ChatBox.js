import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollowingAction } from "../../actions/followerActions";
import "./ChatBox.css";

const ChatBox = () => {
  const dispatch = useDispatch();

  const getFollowing = useSelector((state) => state.getFollowing);
  const { loading, error, success, friends } = getFollowing;

  console.log(friends);

  useEffect(() => {
    dispatch(getUserFollowingAction());
  }, [dispatch]);

  return (
    <Container className="chat-box">
      {/* <FriendList friends={friends} />
      <Chat /> */}
    </Container>
  );
};

export default ChatBox;
