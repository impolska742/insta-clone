import React, { useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import CreateGroupChat from "../CreatGroupChat/CreateGroupChat";
import "./ChatList.css";
import { useSelector, useDispatch } from "react-redux";
import { searchUserAction } from "../../actions/userActions";
import UserListItem from "../UserListItem/UserListItem";
import { accessChatAction, fetchChatsAction } from "../../actions/chatActions";
import { useEffect } from "react";
import { getSender } from "../../util";
import { Avatar } from "@mui/material";
import { GrGroup } from "react-icons/gr";

const options = {
  name: "Search Users",
  scroll: false,
  backdrop: true,
};

const ChatList = ({ setSelectedChat, showList, width }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);
  const fetchChats = useSelector((state) => state.fetchChats);

  const { loading: fetchChatsLoading, error: fetchChatsError } = fetchChats;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(fetchChatsAction(setChats));
  }, [dispatch]);

  return (
    <div
      style={{
        display: `${width < 768 ? (showList ? "block" : "none") : "block"}`,
      }}
      className="chatlist-container"
    >
      <header className="chatlist-header">
        <div className="chatlist-header-top">
          <h5 className="chatlist-header-heading">Your Chats</h5>
          <div className="chatlist-header-buttons d-flex align-items-center">
            <Button variant="primary" onClick={handleOpen} className="me-2">
              Group Chat
            </Button>
            <CreateGroupChat open={open} handleClose={handleClose} />
            <OffCanvasExample {...options} />
          </div>
        </div>

        {fetchChatsLoading && <Loading />}
        {fetchChatsError && <ErrorMessage error={fetchChatsError} />}
        {chats?.map((chat) => {
          const sender = getSender(userInfo, chat.users);
          return (
            <div
              className="chat-friend"
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
            >
              {!chat.isGroupChat ? (
                <Avatar className="chat-avatar" src={sender.displayPhoto} />
              ) : (
                <GrGroup className="chat-avatar group-icon" />
              )}
              <p>{!chat.isGroupChat ? sender.name : chat.chatName}</p>
            </div>
          );
        })}
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
    window.location.reload(false);
  };

  return (
    <>
      <Button variant="primary" onClick={toggleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Users</Offcanvas.Title>
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
