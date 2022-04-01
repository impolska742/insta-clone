import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../actions/userActions";
import { createGroupChatAction } from "../../actions/chatActions";
import Loading from "../Loading";
import UserBadgeItem from "../UserListItem/UserBadgeItem";
import UserListItem from "../UserListItem/UserListItem";
import ErrorMessage from "../ErrorMessage";

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
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [groupChatError, setGroupChatError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const searchUsers = useSelector((state) => state.searchUsers);

  const { loading: searchUsersLoading, users: searchUsersUsers } = searchUsers;

  const handleSearch = (query) => {
    if (!query) {
      return;
    }
    setSearch(query);
    dispatch(searchUserAction(search));
    if (searchUsersUsers) {
      setSearchResults(searchUsersUsers);
    }
  };

  const handleGroup = (userToAdd) => {
    if (!selectedUsers.includes(userToAdd)) {
      setSelectedUsers([...selectedUsers, userToAdd]);
    }
  };

  const handleDelete = (userToDelete) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user._id !== userToDelete._id)
    );
  };

  const handleSubmit = () => {
    if (!groupChatName || !selectedUsers) {
      setGroupChatError("Please fill all the desired fields");
      return;
    }

    dispatch(createGroupChatAction(groupChatName, selectedUsers));
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
          Create Group Chat
        </Typography>
        <hr />
        <Form onSubmit={handleSubmit}>
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
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchUsersLoading && <Loading />}
            {selectedUsers.map((user) => {
              return (
                <UserBadgeItem
                  key={user._id}
                  bg="primary"
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              );
            })}
            {searchResults?.slice(0, 4).map((user) => {
              return (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              );
            })}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          {groupChatError && <ErrorMessage error={groupChatError} />}
        </Form>
      </Box>
    </Modal>
  );
};

export default CreateGroupChat;
