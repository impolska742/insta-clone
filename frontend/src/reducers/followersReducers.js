import {
  ACCEPT_FOLLOW_FAIL,
  ACCEPT_FOLLOW_REQUEST,
  ACCEPT_FOLLOW_SUCCESS,
  ALL_REQUESTS_FAIL,
  ALL_REQUESTS_REQUEST,
  ALL_REQUESTS_SUCCESS,
  ALREADY_FOLLOWING_FAIL,
  ALREADY_FOLLOWING_REQUEST,
  ALREADY_FOLLOWING_SUCCESS,
  CHECK_SENT_FAIL,
  CHECK_SENT_REQUEST,
  CHECK_SENT_SUCCESS,
  GET_FOLLOWING_FAIL,
  GET_FOLLOWING_REQUEST,
  GET_FOLLOWING_SUCCESS,
  REJECT_FOLLOW_FAIL,
  REJECT_FOLLOW_REQUEST,
  REJECT_FOLLOW_SUCCESS,
  SEND_FOLLOW_FAIL,
  SEND_FOLLOW_REQUEST,
  SEND_FOLLOW_SUCCESS,
} from "../constants/followersConstants";

export const sendFollowRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_FOLLOW_REQUEST:
      return { loading: true };
    case SEND_FOLLOW_SUCCESS:
      return { loading: false, success: true };
    case SEND_FOLLOW_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const acceptFollowRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCEPT_FOLLOW_REQUEST:
      return { loading: true };
    case ACCEPT_FOLLOW_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case ACCEPT_FOLLOW_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const rejectFollowRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case REJECT_FOLLOW_REQUEST:
      return { loading: true };
    case REJECT_FOLLOW_SUCCESS:
      return { loading: false, success: true };
    case REJECT_FOLLOW_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const checkSentFollowRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_SENT_REQUEST:
      return { loading: true };
    case CHECK_SENT_SUCCESS:
      return { loading: false, success: true, status: action.payload };
    case CHECK_SENT_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const checkAlreadyFollowingReducer = (state = {}, action) => {
  switch (action.type) {
    case ALREADY_FOLLOWING_REQUEST:
      return { loading: true };
    case ALREADY_FOLLOWING_SUCCESS:
      return { loading: false, success: true, status: action.payload };
    case ALREADY_FOLLOWING_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const allFollowRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_REQUESTS_REQUEST:
      return { loading: true };
    case ALL_REQUESTS_SUCCESS:
      return { loading: false, success: true, requests: action.payload };
    case ALL_REQUESTS_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const getFollowingReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FOLLOWING_REQUEST:
      return { loading: true };
    case GET_FOLLOWING_SUCCESS:
      return { loading: false, success: true, friends: action.payload };
    case GET_FOLLOWING_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
