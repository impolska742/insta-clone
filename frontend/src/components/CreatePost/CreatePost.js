import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Form } from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { createPost } from "../../actions/postActions";
import { postDetails } from "../../util";
import Success from "../Success";

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

const CreatePost = ({ open, handleClose }) => {
  const [photoMessage, setPhotoMessage] = useState("");
  const [photo, setPhoto] = useState("");
  const [caption, setCaption] = useState("");

  const dispatch = useDispatch();
  const postCreate = useSelector((state) => state.postCreate);

  const { loading, success, error } = postCreate;

  const resetFields = () => {
    setCaption("");
    setPhoto("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!photo || !caption) return;
    dispatch(createPost(photo, caption));
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
          Add a post.
        </Typography>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              onChange={(e) =>
                postDetails(e.target.files[0], setPhoto, setPhotoMessage)
              }
            />
          </Form.Group>
          {photo && (
            <img src={photo} alt="post" className="post-preview-image" />
          )}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Caption.</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </Form.Group>
          <hr />
          <Button variant="dark" type="submit" style={{ marginRight: 10 }}>
            Create Post
          </Button>
          <Button variant="outline-light" onClick={resetFields}>
            Reset Fields
          </Button>
          {success && <Success success={"Post Created Successfully."} />}
          {loading && <Loading />}
          {photoMessage && <ErrorMessage error={photoMessage} />}
          {error && <ErrorMessage error={error} />}
        </Form>
      </Box>
    </Modal>
  );
};

export default CreatePost;
