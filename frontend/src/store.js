import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  addCommentReducer,
  deleteCommentReducer,
  getAllPostsReducer,
  getPostReducer,
  postCreateReducer,
  postDeleteReducer,
  postUpdateReducer,
} from "./reducers/postReducers";

import {
  userLoginReducer,
  userCreateReducer,
  userUpdateReducer,
  userDetailsReducer,
  allUsersReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userCreate: userCreateReducer,
  userUpdate: userUpdateReducer,
  allPosts: getAllPostsReducer,
  particularPost: getPostReducer,
  postCreate: postCreateReducer,
  postDelete: postDeleteReducer,
  postUpdate: postUpdateReducer,
  userDetail: userDetailsReducer,
  addComment: addCommentReducer,
  allUsers: allUsersReducer,
  deleteComment: deleteCommentReducer,
});

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo },
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;