import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../actions/userActions";
import Avatar from "@mui/material/Avatar";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./ViewProfile.css";
import Post from "../Post/Post";
import EditProfile from "../../components/EditProfile/EditProfile";
import CreatePost from "../../components/CreatePost/CreatePost";
import {
  alreadyFollowingAction,
  checkSentFollowRequestAction,
  sendFollowRequestAction,
} from "../../actions/followerActions";

const ViewProfile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const { id } = useParams();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, data } = userDetail;

  const checkSentFollowRequest = useSelector(
    (state) => state.checkSentFollowRequest
  );

  const {
    loading: checkSentFollowRequestLoading,
    error: checkSentFollowRequestError,
    status: checkSentFollowRequestStatus,
  } = checkSentFollowRequest;

  const checkAlreadyFollowing = useSelector(
    (state) => state.checkAlreadyFollowing
  );

  const {
    loading: checkAlreadyFollowingLoading,
    error: checkAlreadyFollowingError,
    status: checkAlreadyFollowingStatus,
  } = checkAlreadyFollowing;

  const sendFollowRequest = useSelector((state) => state.sendFollowRequest);
  const {
    loading: followRequestLoading,
    error: followRequestError,
    success: followRequestSuccess,
  } = sendFollowRequest;

  const followRequest = (id) => {
    dispatch(sendFollowRequestAction(id));
  };

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(checkSentFollowRequestAction(id));
    dispatch(alreadyFollowingAction(id));
  }, [dispatch, id, followRequestSuccess]);

  return (
    <Container>
      <div className="user-profile">
        {error && <ErrorMessage error={error} />}
        {loading && <Loading />}
        {data && (
          <>
            <div className="user-avatar-box">
              {data?.user.displayPhoto ? (
                <Avatar
                  className="avatar"
                  sx={{ width: 200, height: 200 }}
                  src={data?.user?.displayPhoto}
                />
              ) : (
                <Avatar className="avatar" sx={{ width: 200, height: 200 }} />
              )}
            </div>
            <div className="user-details">
              <div className="username-box d-flex">
                <h3 id="username">{data?.user?.userName}</h3>

                {userInfo.userName === data?.user?.userName ? (
                  <>
                    <button
                      type="button"
                      id="edit-profile"
                      className="btn btn-dark btn-sm"
                      onClick={handleOpen}
                    >
                      Edit Profile
                    </button>

                    <EditProfile
                      open={open}
                      handleClose={handleClose}
                      prevBio={data?.user?.bio}
                      prevName={data?.user?.name}
                      prevPhoto={data?.user?.displayPhoto}
                      prevUserName={data?.user?.userName}
                      prevIsPrivate={data?.user?.isPrivate}
                      prevEmail={data?.user?.email}
                    />
                  </>
                ) : (
                  <>
                    {checkAlreadyFollowingLoading && <Loading />}

                    {checkAlreadyFollowingStatus ? (
                      <>
                        <button
                          type="button"
                          id="edit-profile-btn"
                          className="btn btn-success btn-sm"
                        >
                          Following
                        </button>
                      </>
                    ) : (
                      <>
                        {checkSentFollowRequestLoading ? (
                          <Loading />
                        ) : (
                          <>
                            {checkSentFollowRequestStatus ? (
                              <button
                                type="button"
                                id="edit-profile-btn"
                                className="btn btn-success btn-sm"
                                disabled={true}
                              >
                                Follow Request Sent
                              </button>
                            ) : (
                              <button
                                type="button"
                                id="edit-profile-btn"
                                className="btn btn-success btn-sm"
                                onClick={() => followRequest(data?.user?._id)}
                              >
                                Follow
                              </button>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {checkSentFollowRequestError && (
                      <ErrorMessage error={checkSentFollowRequestError} />
                    )}
                    {followRequestLoading && <Loading />}
                    {followRequestError && (
                      <ErrorMessage error={followRequestError} />
                    )}
                    {checkAlreadyFollowingError && (
                      <ErrorMessage error={checkAlreadyFollowingError} />
                    )}
                  </>
                )}
              </div>
              <div className="user-stats d-flex">
                <div className="user-stat">
                  <strong>{data?.posts?.length} </strong> posts
                </div>
                <div className="user-stat">
                  <strong>{data?.user?.followers}</strong> followers
                </div>
                <div className="user-stat">
                  <strong>{data?.user?.friends?.length}</strong> following
                </div>
              </div>

              <div className="display-name">
                <strong>{data?.user?.name}</strong>
              </div>

              <div className="bio">
                <p>{data?.user?.bio}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <hr />
      {data?.posts?.length ? (
        data?.posts?.map((post) => (
          <Post
            key={post?._id}
            postID={post?._id}
            userName={post?.userName}
            photo={post.photo}
            caption={post.caption}
            comments={post.comments}
            displayPhoto={data?.user?.displayPhoto}
            userID={post.user}
          />
        ))
      ) : (
        <>
          {userInfo.userName === data?.user?.userName ? (
            <Container className=" user-profile posts-not-found">
              <h3 className="">Click here to make your first post.</h3>
              <button onClick={handleOpen2} className="btn btn-dark">
                Create Post
              </button>
              <CreatePost open={open2} handleClose={handleClose2} />
            </Container>
          ) : (
            <Container className=" user-profile posts-not-found">
              <h3 className="">No Posts found.</h3>
            </Container>
          )}
        </>
      )}
    </Container>
  );
};

export default ViewProfile;
