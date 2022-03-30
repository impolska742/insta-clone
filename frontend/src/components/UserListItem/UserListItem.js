import { Avatar } from "@mui/material";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div onClick={handleFunction}>
      <Avatar src={user.displayPhoto} />
      <p>{user.name}</p>
    </div>
  );
};

export default UserListItem;
