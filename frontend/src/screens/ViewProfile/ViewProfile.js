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

const ViewProfile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, data } = userDetail;

  // const { userName, name, followers, bio, displayPhoto } = data.user;

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

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
                <button
                  type="button"
                  id="edit-profile"
                  className="btn btn-dark btn-sm"
                  onClick={handleOpen}
                >
                  Edit Profile
                </button>

                <EditProfile open={open} handleClose={handleClose} />
              </div>
              <div className="user-stats d-flex">
                <div className="user-stat">
                  <strong>123</strong> posts
                </div>
                <div className="user-stat">
                  <strong>123</strong> posts
                </div>
                <div className="user-stat">
                  <strong>123</strong> posts
                </div>
              </div>

              <div className="display-name">
                <strong>Random FullName</strong>
              </div>

              <div className="bio">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
                  impedit repellendus veritatis quidem illum aut ut
                  reprehenderit obcaecati! Temporibus, ipsa.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      {data?.posts?.map((post) => (
        <Post
          key={post?._id}
          postID={post?._id}
          userName={post?.userName}
          photo={post.photo}
          caption={post.caption}
          comments={post.comments}
          displayPhoto={post.imageUrl}
          userID={post.user}
        />
      ))}
    </Container>
  );
};

export default ViewProfile;
