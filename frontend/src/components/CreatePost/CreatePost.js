/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Form } from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { createPost } from "../../actions/postActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
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

  const postDetails = (pics) => {
    if (pics === null) {
      return setPhotoMessage("Please select an Image");
    } else {
      setPhotoMessage(null);
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "notezipper");
        data.append("cloud_name", "vaibhav19bhardwaj");
        fetch(
          "https://api.cloudinary.com/v1_1/vaibhav19bhardwaj/image/upload",
          {
            method: "post",
            body: data,
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setPhoto(data.url.toString());
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return setPhotoMessage("Please select an image.");
      }
    }
  };

  const resetFields = () => {
    setCaption("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("HLLO");
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
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Add a post.
        </Typography>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </Form.Group>
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
          {success && (
            <div class="alert alert-dismissible alert-success">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
              ></button>
              <strong>Post Created Successfully.</strong>
            </div>
          )}
          {loading && <Loading />}
          {photoMessage && <ErrorMessage error={photoMessage} />}
          {error && <ErrorMessage error={error} />}
        </Form>
      </Box>
    </Modal>
  );
};

export default CreatePost;
