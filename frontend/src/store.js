import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  acceptFollowRequestReducer,
  allFollowRequestReducer,
  checkAlreadyFollowingReducer,
  checkSentFollowRequestReducer,
  getFollowingReducer,
  rejectFollowRequestReducer,
  sendFollowRequestReducer,
} from "./reducers/followersReducers";
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
  userDeleteReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userCreate: userCreateReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  allPosts: getAllPostsReducer,
  particularPost: getPostReducer,
  postCreate: postCreateReducer,
  postDelete: postDeleteReducer,
  postUpdate: postUpdateReducer,
  userDetail: userDetailsReducer,
  addComment: addCommentReducer,
  allUsers: allUsersReducer,
  deleteComment: deleteCommentReducer,
  sendFollowRequest: sendFollowRequestReducer,
  acceptFollowRequest: acceptFollowRequestReducer,
  rejectFollowRequest: rejectFollowRequestReducer,
  checkSentFollowRequest: checkSentFollowRequestReducer,
  checkAlreadyFollowing: checkAlreadyFollowingReducer,
  allFollowRequests: allFollowRequestReducer,
  getFollowing: getFollowingReducer,
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
