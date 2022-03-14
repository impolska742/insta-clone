import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/userActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import Avatar from "@mui/material/Avatar";
import "./ExploreScreen.css";

const ExploreScreen = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const { loading, users, error } = allUsers;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Container>
      {loading && <Loading />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <h1>Users</h1>
      <hr />
      <div className="users-container">
        {users?.users?.map((user) => {
          return (
            <div key={user._id}>
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
              <p>{user.userName}</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default ExploreScreen;
