import React, { useState, useEffect } from "react";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { addCommentAction } from "../../actions/postActions";
import Loading from "../../components/Loading";
import SendIcon from "@mui/icons-material/Send";
import ErrorMessage from "../../components/ErrorMessage";

import {
  deleteCommentAction,
  deletePostAction,
} from "../../actions/postActions";
import EditPost from "../../components/EditPost/EditPost";

const Post = ({
  postID,
  userName,
  photo,
  caption,
  comments,
  displayPhoto,
  userID,
}) => {
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [prevCaption, setPrevCaption] = useState("");
  const [prevPhoto, setPrevPhoto] = useState("");

  const dispatch = useDispatch();

  const addComment = useSelector((state) => state.addComment);
  const {
    loading: addCommentLoading,
    error: addCommentError,
    success: addCommentSuccess,
  } = addComment;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteComment = useSelector((state) => state.deleteComment);
  const {
    loading: deleteCommentLoading,
    success: deleteCommentSuccess,
    error: deleteCommentError,
  } = deleteComment;

  const postDelete = useSelector((state) => state.postDelete);
  const {
    loading: postDeleteLoading,
    success: postDeleteSuccess,
    error: postDeleteError,
  } = postDelete;

  const postComment = (e) => {
    e.preventDefault();
    if (!comment) return;
    dispatch(addCommentAction(comment, postID));
    setComment("");
  };

  useEffect(() => {
    if (caption) setPrevCaption(caption);
    if (photo) setPrevPhoto(photo);
  }, [
    caption,
    photo,
    deleteCommentSuccess,
    addCommentSuccess,
    postDeleteSuccess,
  ]);

  const deletePostSubmit = () => {
    if (window.confirm("Do you want to permanently delete this post?")) {
      dispatch(deletePostAction(postID));
    }
  };

  const deleteCommentSubmit = (id) => {
    if (window.confirm("Do you want to  delete this comment?")) {
      dispatch(deleteCommentAction(id));
    }
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="d-flex">
          {displayPhoto ? (
            <Avatar className="post-avatar" src={displayPhoto} />
          ) : (
            <Avatar className="post-avatar" />
          )}
          <Link className="post-username-link" to={`/view-profile/${userID}`}>
            {userName}
          </Link>
        </div>

        {userInfo?.id.toString() === userID?.toString() && (
          <div>
            <button
              type="button"
              className="edit-button btn btn-outline-success"
              onClick={handleOpen}
            >
              Edit
            </button>
            <button
              type="button"
              className="delete-button btn btn-outline-danger"
              onClick={deletePostSubmit}
            >
              Delete
            </button>
            {postDeleteLoading && <Loading />}
            {postDeleteError && <ErrorMessage>{postDeleteError}</ErrorMessage>}
            <EditPost
              open={open}
              handleClose={handleClose}
              prevPhoto={prevPhoto}
              prevCaption={prevCaption}
              setPrevPhoto={setPrevPhoto}
              setPrevCaption={setPrevCaption}
              postID={postID}
            />
          </div>
        )}
      </div>

      <img className="post-image" src={photo} alt="User friend post" />

      <h5 className="post-text">
        <Link className="post-username-link" to={`/view-profile/${userID}`}>
          <strong>{userName} </strong>
        </Link>
        <span className="post-caption">{caption}</span>
      </h5>
      <hr className="hrr" />
      <div className="comments">
        {comments.map(({ comment, userName, _id, userId }) => (
          <div key={_id} className="comment">
            <div className="d-flex">
              <Link
                className="post-username-link"
                to={`/view-profile/${userId}`}
              >
                <strong>{userName} </strong>
              </Link>
              <span>{comment}</span>
            </div>
            {deleteCommentLoading && <Loading />}
            {deleteCommentError && (
              <ErrorMessage>{deleteCommentError}</ErrorMessage>
            )}
            {userInfo?.id.toString() === userID?.toString() && (
              <button
                type="button"
                onClick={() => deleteCommentSubmit(_id)}
                class="btn btn-outline-danger"
                id="delete-comment-btn"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {addCommentError && <ErrorMessage>{addCommentError}</ErrorMessage>}
      {addCommentLoading && <Loading />}

      <Form onSubmit={postComment}>
        <Form.Group className="post__commentBox">
          <Form.Control
            type="text"
            id="comment-input"
            placeholder="Enter a comment"
            value={comment}
            autoComplete="off"
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__commentButton"
            type="submit"
            style={{ marginRight: 10 }}
          >
            <SendIcon className="icon" />
          </button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Post;
