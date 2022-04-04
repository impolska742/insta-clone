import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/userActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import Avatar from "@mui/material/Avatar";
import "./ExploreScreen.css";
import { useNavigate } from "react-router-dom";

const ExploreScreen = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const { loading, users, error } = allUsers;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  let navigate = useNavigate();

  const handleSubmit = (id) => {
    navigate(`/view-profile/${id}`);
  };

  return (
    <Container>
      {loading && <Loading />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <h1>Users</h1>
      <hr />
      <div className="users-container">
        {users?.map((user) => {
          return (
            <div
              onClick={() => handleSubmit(user._id)}
              className="user"
              key={user._id}
            >
              {user.displayPhoto ? (
                <Avatar
                  className="explore-avatar"
                  sx={{ width: 200, height: 200 }}
                  src={user?.displayPhoto}
                />
              ) : (
                <Avatar
                  className="explore-avatar"
                  sx={{ width: 200, height: 200 }}
                />
              )}
              <div>
                <h4>{user.userName}</h4>
                <p className="username">{user.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default ExploreScreen;
