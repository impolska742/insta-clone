import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptFollowRequestAction,
  rejectFollowRequestAction,
} from "../../actions/followerActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

const SingleNotification = ({ requestId, displayPhoto, userName, name }) => {
  const dispatch = useDispatch();

  const acceptFollowRequest = useSelector((state) => state.acceptFollowRequest);
  const rejectFollowRequest = useSelector((state) => state.rejectFollowRequest);

  const {
    loading: acceptFollowRequestLoading,
    error: acceptFollowRequestError,
    success: acceptFollowRequestSuccess,
  } = acceptFollowRequest;

  const {
    loading: rejectFollowRequestLoading,
    error: rejectFollowRequestError,
    success: rejectFollowRequestSuccess,
  } = rejectFollowRequest;

  const acceptFollowRequestSubmit = (id) => {
    dispatch(acceptFollowRequestAction(id));
  };
  const rejectFollowRequestSubmit = (id) => {
    dispatch(rejectFollowRequestAction(id));
  };

  useEffect(() => {}, [acceptFollowRequestSuccess, rejectFollowRequestSuccess]);

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
      </div>

      {acceptFollowRequestLoading && <Loading />}
      {rejectFollowRequestLoading && <Loading />}

      {acceptFollowRequestError && (
        <ErrorMessage error={acceptFollowRequestError} />
      )}
      {rejectFollowRequestError && (
        <ErrorMessage error={rejectFollowRequestError} />
      )}
    </div>
  );
};

export default SingleNotification;
