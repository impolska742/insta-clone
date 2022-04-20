import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptFollowRequestAction,
  rejectFollowRequestAction,
} from "../../actions/followerActions";

const SingleNotification = ({
  requestId,
  displayPhoto,
  userName,
  name,
  setRefresh,
}) => {
  const dispatch = useDispatch();

  const acceptFollowRequestSubmit = (id) => {
    dispatch(acceptFollowRequestAction(id));
  };
  const rejectFollowRequestSubmit = (id) => {
    dispatch(rejectFollowRequestAction(id));
  };

  const acceptFollowRequest = useSelector((state) => state.acceptFollowRequest);
  const rejectFollowRequest = useSelector((state) => state.rejectFollowRequest);

  const { success: acceptFollowRequestSuccess } = acceptFollowRequest;
  const { success: rejectFollowRequestSuccess } = rejectFollowRequest;

  useEffect(() => {
    if (acceptFollowRequestSuccess || rejectFollowRequestSuccess)
      setRefresh(true);
  }, [acceptFollowRequestSuccess, rejectFollowRequestSuccess, setRefresh]);

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
      <Form>
        <button
          className="btn btn-success"
          id="edit-profile-btn"
          onClick={() => acceptFollowRequestSubmit(requestId)}
        >
          Accept
        </button>
        <button
          className="btn btn-danger"
          id="edit-profile-btn"
          onClick={() => rejectFollowRequestSubmit(requestId)}
        >
          Reject
        </button>
      </Form>
    </div>
  );
};

export default SingleNotification;
