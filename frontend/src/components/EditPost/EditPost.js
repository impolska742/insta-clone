import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Form } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/postActions";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { postDetails } from "../../util";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#222222",
  boxShadow: 50,
  p: 4,
};

const EditPost = ({
  open,
  handleClose,
  prevPhoto,
  prevCaption,
  setPrevPhoto,
  setPrevCaption,
  postID,
}) => {
  const [photoMessage, setPhotoMessage] = useState("");

  const resetFields = () => {
    setPrevCaption("");
    setPrevPhoto("");
  };

  const dispatch = useDispatch();

  const postUpdate = useSelector((state) => state.postUpdate);
  const {
    loading: postUpdateLoading,
    success: postUpdateSuccess,
    error: postUpdateError,
  } = postUpdate;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prevCaption || !prevPhoto) return;
    dispatch(updatePost(postID, prevPhoto, prevCaption));
    resetFields();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box id="modal-box" sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Update a post.
        </Typography>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              onChange={(e) =>
                postDetails(e.target.files[0], setPrevPhoto, setPhotoMessage)
              }
            />
          </Form.Group>
          {prevPhoto && (
            <img src={prevPhoto} alt="post" className="post-preview-image" />
          )}
          <Form.Group className="mb-3">
            <Form.Label>Caption.</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              value={prevCaption}
              onChange={(e) => setPrevCaption(e.target.value)}
            />
          </Form.Group>
          <hr />
          <Button variant="dark" type="submit" style={{ marginRight: 10 }}>
            Update Post
          </Button>
          <Button variant="outline-light" onClick={resetFields}>
            Reset Fields
          </Button>
          {postUpdateSuccess && (
            <div className="alert alert-dismissible alert-success">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
              ></button>
              <strong>Post Updated Successfully.</strong>
            </div>
          )}
          {postUpdateLoading && <Loading />}
          {photoMessage && <ErrorMessage>{photoMessage}</ErrorMessage>}
          {postUpdateError && <ErrorMessage>{postUpdateError}</ErrorMessage>}
        </Form>
      </Box>
    </Modal>
  );
};

export default EditPost;
