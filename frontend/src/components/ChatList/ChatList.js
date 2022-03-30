import React, { useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import CreateGroupChat from "../CreatGroupChat/CreateGroupChat";
import "./ChatList.css";
import { useSelector, useDispatch } from "react-redux";
import { searchUserAction } from "../../actions/userActions";
import UserListItem from "../UserListItem/UserListItem";
import { accessChatAction } from "../../actions/chatActions";

const options = {
  name: "Search Users",
  scroll: false,
  backdrop: true,
};

const ChatList = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="chatlist-container ">
      <header className="chatlist-header">
        <div className="chatlist-header-buttons d-flex">
          <button onClick={handleOpen}>Group Chat</button>
          <CreateGroupChat open={open} handleClose={handleClose} />
          <button>Single Chat</button>
          <OffCanvasExample {...options} />
        </div>
      </header>
    </div>
  );
};

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const dispatch = useDispatch();
  const searchUsers = useSelector((state) => state.searchUsers);

  const {
    loading: searchUsersLoading,
    error: searchUsersError,
    users: searchUsersUsers,
    success: searchUsersSuccess,
  } = searchUsers;

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchUserAction(search));
    }
  };

  const handleFunction = (id) => {
    dispatch(accessChatAction(id));
  };

  return (
    <>
      <Button variant="primary" onClick={toggleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSearch}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search User"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {searchUsersLoading ? (
            <Loading />
          ) : (
            searchUsersSuccess &&
            (searchUsersUsers?.length > 0 ? (
              searchUsersUsers?.map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleFunction(user._id)}
                  />
                );
              })
            ) : (
              <ErrorMessage error={"No users found."} />
            ))
          )}
          {searchUsersError && <ErrorMessage error={searchUsersError} />}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ChatList;