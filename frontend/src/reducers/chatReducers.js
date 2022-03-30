import {
  ACCESS_CHAT_REQUEST,
  ACCESS_CHAT_SUCCESS,
  ACCESS_CHAT_FAIL,
} from "../constants/chatConstants";

export const accessChatReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCESS_CHAT_REQUEST:
      return { loading: true };
    case ACCESS_CHAT_SUCCESS:
      return { loading: false, success: true, chat: action.payload };
    case ACCESS_CHAT_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
