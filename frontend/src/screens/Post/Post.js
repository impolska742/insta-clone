import React, { useEffect, useState } from "react";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { addCommentAction } from "../../actions/postActions";
import Loading from "../../components/Loading";
import SendIcon from "@mui/icons-material/Send";
import ErrorMessage from "../../components/ErrorMessage";

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

  let navigate = useNavigate();

  const dispatch = useDispatch();
  const addComment = useSelector((state) => state.addComment);
  const { loading, error, success } = addComment;

  const postComment = (e) => {
    e.preventDefault();
    if (!comment) return;
    dispatch(addCommentAction(comment, postID));
    setComment("");
  };

  useEffect(() => {
    navigate("/feed");
  }, [success, navigate]);

  return (
    <div className="post-container">
      <div className="post-header">
        {displayPhoto ? (
          <Avatar className="post-avatar" />
        ) : (
          <Avatar className="post-avatar" src={displayPhoto} />
        )}
        <Link className="post-username-link" to={`/edit-profile/${userID}`}>
          <h5>{userName}</h5>
        </Link>
      </div>

      <img className="post-image" src={photo} alt="User friend post" />

      <h5 className="post-text">
        <Link className="post-username-link" to={`/edit-profile/${userID}`}>
          <strong>{userName} </strong>
        </Link>
        <span className="post-caption">{caption}</span>
      </h5>

      {comments.map(({ comment, userName, _id }) => (
        <div key={_id} className="comment">
          <Link className="post-username-link" to={`/edit-profile/${userID}`}>
            <strong>{userName} </strong>
          </Link>
          <span>{comment}</span>
        </div>
      ))}
      {error && <ErrorMessage error={error} />}
      {loading && <Loading />}

      <Form onSubmit={postComment}>
        <Form.Group
          className="post__commentBox"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Control
            type="text"
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
