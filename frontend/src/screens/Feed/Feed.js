import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../actions/postActions";
import Loading from "../../components/Loading";
import Post from "../Post/Post";
import "./Feed.css";

const Feed = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const allPosts = useSelector((state) => state.allPosts);
  const { loading, error, posts } = allPosts;

  useEffect(() => {
    dispatch(getAllPosts());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <Container className="all-posts">
      {loading && <Loading />}
      {posts?.map((post) => {
        return (
          <Post
            key={post._id}
            userName={post?.userName}
            photo={post.photo}
            caption={post.caption}
            comments={post.comments}
          />
        );
      })}
      {error && (
        <div class="alert alert-dismissible alert-danger">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
          ></button>
          <strong>{error}</strong>{" "}
        </div>
      )}
    </Container>
  );
};

export default Feed;
