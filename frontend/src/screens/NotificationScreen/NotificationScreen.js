import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./NotificationScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllFollowRequestsAction } from "../../actions/followerActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import LandingPageRow from "../../components/LandingPageRow/LandingPageRow";
import { row3 } from "../../landingPageDetails";
import SingleNotification from "./SingleNotification";

const NotificationScreen = () => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const allFollowRequests = useSelector((state) => state.allFollowRequests);

  const { loading, error, requests, success } = allFollowRequests;

  useEffect(() => {
    dispatch(getAllFollowRequestsAction());
  }, [dispatch, refresh]);

  return (
    <Container>
      {loading && <Loading />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && requests?.length ? (
        <div className="users-container">
          {requests?.map((request) => {
            return (
              <SingleNotification
                key={request._id}
                requestId={request._id}
                displayPhoto={request?.sender?.displayPhoto}
                userName={request?.sender?.userName}
                name={request?.sender?.name}
                setRefresh={setRefresh}
              />
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
