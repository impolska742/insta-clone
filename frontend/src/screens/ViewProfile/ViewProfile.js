import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../actions/userActions";
import Avatar from "@mui/material/Avatar";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./ViewProfile.css";
import Post from "../Post/Post";

const EditProfile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, data } = userDetail;

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  return (
    <Container>
      <div className="user-profile">
        {error && <ErrorMessage error={error} />}
        {loading && <Loading />}
        <div>
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
        <h2>{data?.user?.userName}</h2>
      </div>
      {data?.posts?.map((post) => (
        <Post
          key={post._id}
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

export default EditProfile;
