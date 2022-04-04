import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  acceptFollowRequestAction,
  rejectFollowRequestAction,
} from "../../actions/followerActions";

const SingleNotification = ({ requestId, displayPhoto, userName, name }) => {
  const dispatch = useDispatch();

  const acceptFollowRequestSubmit = (id) => {
    dispatch(acceptFollowRequestAction(id));
  };
  const rejectFollowRequestSubmit = (id) => {
    dispatch(rejectFollowRequestAction(id));
  };

  return (
    <div className="user" key={requestId}>
      <div className="d-flex">
        <div>
          {displayPhoto ? (
            <Avatar
              className="explore-avatar"
              sx={{ width: 200, height: 200 }}
              src={displayPhoto}
            />
          ) : (
            <Avatar
              className="explore-avatar"
              sx={{ width: 200, height: 200 }}
            />
          )}
        </div>
        <div>
          <h4>{userName}</h4>
          <p className="username">{name}</p>
        </div>
      </div>
      <div>
        <button
          className="btn btn-success"
          id="edit-profile-btn"
          onSubmit={() => acceptFollowRequestSubmit(requestId)}
        >
          Accept
        </button>
        <button
          className="btn btn-danger"
          id="edit-profile-btn"
          onSubmit={() => rejectFollowRequestSubmit(requestId)}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default SingleNotification;
