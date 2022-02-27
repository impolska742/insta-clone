import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Form } from "react-bootstrap";
import Modal from "@mui/material/Modal";

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

const EditProfile = ({
  open,
  handleClose,
  name,
  userName,
  userID,
  bio,
  displayPhoto,
}) => {
  const [prevUserName, setPrevUserName] = useState("");
  const [prevBio, setPrevBio] = useState("");
  const [prevName, setPrevName] = useState("");
  const [prevDisplayPhoto, setPrevDisplayPhoto] = useState("");

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box id="modal-box" sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Edit Profile.
        </Typography>
        <hr />
        <Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              //   onChange={(e) => postDetails(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Caption.</Form.Label>
            <Form.Control as="textarea" rows={1} />
          </Form.Group>
          <hr />
          <Button variant="dark" type="submit" style={{ marginRight: 10 }}>
            Update Post
          </Button>
        </Form>
      </Box>
    </Modal>
  );
};

export default EditProfile;
