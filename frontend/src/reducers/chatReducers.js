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
  UPDATE_GROUP_CHAT_REQUEST,
  UPDATE_GROUP_CHAT_SUCCESS,
  UPDATE_GROUP_CHAT_FAIL,
  ALL_MESSAGES_REQUEST,
  ALL_MESSAGES_SUCCESS,
  ALL_MESSAGES_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
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

export const updateGroupChatReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_GROUP_CHAT_REQUEST:
      return { loading: true };
    case UPDATE_GROUP_CHAT_SUCCESS:
      return { loading: false, success: true, chat: action.payload };
    case UPDATE_GROUP_CHAT_FAIL:
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

export const allMessagesReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_MESSAGES_REQUEST:
      return { loading: true };
    case ALL_MESSAGES_SUCCESS:
      return {
        loading: false,
        success: true,
        messages: action.payload,
      };
    case ALL_MESSAGES_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const sendMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return { loading: true };
    case SEND_MESSAGE_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case SEND_MESSAGE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
