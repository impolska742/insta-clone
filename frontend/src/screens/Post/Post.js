import React from "react";
import "./Post.css";

const Post = ({ userName, photo, caption, comments }) => {
  return (
    <div className="post-container">
      <div className="post-header">
        <h4>{userName}</h4>
      </div>
      <img className="post-image" src={photo} alt="User friend post" />
      <h5 className="post__text">
        <strong>{userName} </strong> {caption}
      </h5>
      {comments.map((comment, idx) => (
        <p key={idx}>{comment}</p>
      ))}
    </div>
  );
};

export default Post;
