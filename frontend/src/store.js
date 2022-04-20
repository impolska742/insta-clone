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
  accessChatReducer,
  allMessagesReducer,
  createGroupChatReducer,
  fetchChatsReducer,
  sendMessageReducer,
  updateGroupChatReducer,
} from "./reducers/chatReducers";

import {
  userLoginReducer,
  userCreateReducer,
  userUpdateReducer,
  userDetailsReducer,
  allUsersReducer,
  userDeleteReducer,
  searchUsersReducer,
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
  searchUsers: searchUsersReducer,
  accessChat: accessChatReducer,
  fetchChats: fetchChatsReducer,
  createGroupChat: createGroupChatReducer,
  updateGroupChat: updateGroupChatReducer,
  allMessages: allMessagesReducer,
  sendMessage: sendMessageReducer,
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
