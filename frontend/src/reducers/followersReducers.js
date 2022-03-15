import {
  ACCEPT_FOLLOW_FAIL,
  ACCEPT_FOLLOW_REQUEST,
  ACCEPT_FOLLOW_SUCCESS,
  CHECK_SENT_FAIL,
  CHECK_SENT_REQUEST,
  CHECK_SENT_SUCCESS,
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
      return { loading: false, success: true };
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
      return { loading: false, success: true };
    case CHECK_SENT_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
