import { Avatar } from "@mui/material";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div className="chat-friend" onClick={handleFunction}>
      <Avatar className="chat-avatar" src={user.displayPhoto} />
      <p>{user.name}</p>
    </div>
  );
};

export default UserListItem;
