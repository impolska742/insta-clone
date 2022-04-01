import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../actions/userActions";
import UserBadgeItem from "../UserListItem/UserBadgeItem";
import Loading from "../Loading";
import UserListItem from "../UserListItem/UserListItem";

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

export default function BasicModal({
  open,
  handleClose,
  prevGroupName,
  prevUsers,
}) {
  const [groupName, setGroupName] = useState(prevGroupName);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(prevUsers);

  const searchUsers = useSelector((state) => state.searchUsers);
  const dispatch = useDispatch();

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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box id="modal-box" sx={style}>
        <Typography id="modal-modal-title" variant="h4">
          Text in a modal
        </Typography>
        <hr />
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
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
          </Form.Group>

          <Button variant="dark" type="submit">
            Update
          </Button>
        </Form>
      </Box>
    </Modal>
  );
}
