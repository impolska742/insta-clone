import { Avatar } from "@mui/material";
import React from "react";
import "./FriendsList.css";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

const FriendsList = ({ chat, setChat, error, success, loading, friends }) => {
  const openChat = () => {};
  return (
    <div className="friend-container">
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {success && (
        <>
          {friends?.map((friend) => {
            return (
              <div onClick={openChat} className="chat-friend" key={friend._id}>
                {friend?.displayPhoto ? (
                  <Avatar
                    className="chat-avatar"
                    sx={{ width: 50, height: 50 }}
                    src={friend?.displayPhoto}
                  />
                ) : (
                  <Avatar
                    className="chat-avatar"
                    sx={{ width: 50, height: 50 }}
                  />
                )}
                <h6>{friend.name}</h6>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default FriendsList;
