import React, { useState } from "react";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
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

  const dispatch = useDispatch();
  const addComment = useSelector((state) => state.addComment);
  const { loading, error } = addComment;

  const postComment = (e) => {
    if (!comment) return;
    dispatch(addCommentAction(comment, postID));
    setComment("");
  };

  return (
    <div className="post-container">
      <div className="post-header">
        {displayPhoto ? (
          <Avatar className="post-avatar" />
        ) : (
          <Avatar className="post-avatar" src={displayPhoto} />
        )}
        <Link className="post-username-link" to={`/view-profile/${userID}`}>
          <h5>{userName}</h5>
        </Link>
      </div>

      <img className="post-image" src={photo} alt="User friend post" />

      <h5 className="post-text">
        <Link className="post-username-link" to={`/view-profile/${userID}`}>
          <strong>{userName} </strong>
        </Link>
        <span className="post-caption">{caption}</span>
      </h5>

      {comments.map(({ comment, userName, _id }) => (
        <div key={_id} className="comment">
          <Link className="post-username-link" to={`/view-profile/${userID}`}>
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
