import React from "react";
import { Container } from "react-bootstrap";
import "./NotificationScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  acceptFollowRequestAction,
  getAllFollowRequestsAction,
  rejectFollowRequestAction,
} from "../../actions/followerActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { Avatar } from "@mui/material";
import Success from "../../components/Success";
import LandingPageRow from "../../components/LandingPageRow/LandingPageRow";
import { row3 } from "../../landingPageDetails";

const NotificationScreen = () => {
  const dispatch = useDispatch();
  const allFollowRequests = useSelector((state) => state.allFollowRequests);

  const { loading, error, requests, success } = allFollowRequests;

  useEffect(() => {
    dispatch(getAllFollowRequestsAction());
  }, [dispatch]);

  const acceptFollowRequest = useSelector((state) => state.acceptFollowRequest);
  const rejectFollowRequest = useSelector((state) => state.rejectFollowRequest);

  const {
    loading: acceptFollowRequestLoading,
    error: acceptFollowRequestError,
    success: acceptFollowRequestSuccess,
    message: acceptFollowRequestMessage,
  } = acceptFollowRequest;

  const {
    loading: rejectFollowRequestLoading,
    error: rejectFollowRequestError,
    success: rejectFollowRequestSuccess,
    message: rejectFollowRequestMessage,
  } = rejectFollowRequest;

  const acceptFollowRequestSubmit = (id) => {
    dispatch(acceptFollowRequestAction(id));
  };
  const rejectFollowRequestSubmit = (id) => {
    dispatch(rejectFollowRequestAction(id));
  };

  return (
    <Container>
      {loading && <Loading />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && requests?.length ? (
        <div className="users-container">
          {requests?.map((request) => {
            return (
              <div className="user" key={request._id}>
                <div className="d-flex">
                  <div>
                    {request?.sender?.displayPhoto ? (
                      <Avatar
                        className="explore-avatar"
                        sx={{ width: 200, height: 200 }}
                        src={request?.sender?.displayPhoto}
                      />
                    ) : (
                      <Avatar
                        className="explore-avatar"
                        sx={{ width: 200, height: 200 }}
                      />
                    )}
                  </div>
                  <div>
                    <h4>{request?.sender?.userName}</h4>
                    <p className="username">{request?.sender?.name}</p>
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-success"
                    id="edit-profile-btn"
                    onClick={() => acceptFollowRequestSubmit(request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    id="edit-profile-btn"
                    onClick={() => rejectFollowRequestSubmit(request._id)}
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

                {acceptFollowRequestSuccess && (
                  <Success success={acceptFollowRequestMessage} />
                )}

                {rejectFollowRequestSuccess && (
                  <Success success={rejectFollowRequestMessage} />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <LandingPageRow row={row3} notifications={true} />
      )}
    </Container>
  );
};

export default NotificationScreen;
