import {
  ACCESS_CHAT_REQUEST,
  ACCESS_CHAT_SUCCESS,
  ACCESS_CHAT_FAIL,
  FETCH_CHATS_REQUEST,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_FAIL,
  CREATE_GROUP_CHAT_REQUEST,
  CREATE_GROUP_CHAT_SUCCESS,
  CREATE_GROUP_CHAT_FAIL,
} from "../constants/chatConstants";

export const createGroupChatReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_GROUP_CHAT_REQUEST:
      return { loading: true };
    case CREATE_GROUP_CHAT_SUCCESS:
      return { loading: false, success: true, chat: action.payload };
    case CREATE_GROUP_CHAT_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

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

export const fetchChatsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CHATS_REQUEST:
      return { loading: true };
    case FETCH_CHATS_SUCCESS:
      return {
        loading: false,
        success: true,
        chats: action.payload,
      };
    case FETCH_CHATS_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};
