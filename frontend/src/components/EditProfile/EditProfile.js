import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Form } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import { postDetails } from "../../util";
import Switch from "@mui/material/Switch";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction, updateUserAction } from "../../actions/userActions";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
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

const EditProfile = ({
  open,
  handleClose,
  prevName,
  prevUserName,
  prevBio,
  prevPhoto,
  prevEmail,
  prevIsPrivate,
}) => {
  const [name, setName] = useState(prevName);
  const [userName, setUserName] = useState(prevUserName);
  const [bio, setBio] = useState(prevBio);
  const [photo, setPhoto] = useState(prevPhoto);
  const [isPrivate, setIsPrivate] = useState(prevIsPrivate);
  const [email, setEmail] = useState(prevEmail);
  const [photoMessage, setPhotoMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, message } = userUpdate;

  const handleSubmit = () => {
    dispatch(updateUserAction(bio, email, userName, photo, name, isPrivate));
  };

  const handleDeleteUser = () => {
    if (window.confirm("Do you want to permanently delete your account?")) {
      dispatch(deleteUserAction());
      navigate("/");
    }
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
          Edit Profile.
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
            <img src={photo} alt="post" className="post-preview-image small" />
          )}

          {photoMessage && <ErrorMessage>{photoMessage}</ErrorMessage>}
          <Form.Group className="mb-3 d-flex edit-username-name">
            <div>
              <Form.Label>User-name</Form.Label>
              <Form.Control
                as="input"
                rows={1}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <Form.Label>Name</Form.Label>
              <Form.Control
                as="input"
                rows={1}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </Form.Group>

          <Form.Label>Email</Form.Label>
          <Form.Control
            as="input"
            type="email"
            rows={1}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Form.Group>

          <hr />

          <div className="d-flex">
            <div className="btns">
              <Button variant="dark" type="submit" style={{ marginRight: 10 }}>
                Update Profile
              </Button>
              <Button
                variant="danger"
                type="submit"
                style={{ marginRight: 10 }}
                onClick={handleDeleteUser}
              >
                Delete Account
              </Button>
            </div>
            <div>
              <span>Keep the account private?</span>
              <Switch
                checked={isPrivate}
                onChange={() => setIsPrivate(!isPrivate)}
              />
            </div>
          </div>
        </Form>

        {loading && <Loading />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {message && <Success success={message} />}
      </Box>
    </Modal>
  );
};

export default EditProfile;
