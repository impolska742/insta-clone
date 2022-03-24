import { Avatar } from "@mui/material";
import React from "react";
import "./FriendsList.css";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { useNavigate } from "react-router-dom";

const FriendsList = ({ error, success, loading, friends }) => {
  const navigate = useNavigate();

  const openChat = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="friend-container">
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {success && (
        <>
          {friends?.map((friend) => {
            return (
              <div
                onClick={() => openChat(friend._id)}
                className="chat-friend"
                key={friend._id}
              >
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
