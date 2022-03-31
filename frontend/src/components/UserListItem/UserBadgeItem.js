import React from "react";
import { Badge, CloseButton } from "react-bootstrap";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Badge>
      {user.name}
      <CloseButton onClick={handleFunction} />
    </Badge>
  );
};

export default UserBadgeItem;
