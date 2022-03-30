import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

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

const CreateGroupChat = ({ open, handleClose }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box id="modal-box" sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Create Group Chat
        </Typography>
        <hr />
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Chat Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Add Users. E.g : John, Michael, Zack etc."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* Selected results */}
            {/* Render searched results */}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Box>
    </Modal>
  );
};

export default CreateGroupChat;
