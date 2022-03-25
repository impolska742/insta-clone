import {
  GET_CONVERSATION_FAIL,
  GET_CONVERSATION_REQUEST,
  GET_CONVERSATION_SUCCESS,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
} from "../constants/conversationConstants";

export const getConversationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CONVERSATION_REQUEST:
      return { loading: true };
    case GET_CONVERSATION_SUCCESS:
      return { loading: false, success: true, conversation: action.payload };
    case GET_CONVERSATION_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const sendMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return { loading: true };
    case SEND_MESSAGE_SUCCESS:
      return { loading: false, success: true, conversation: action.payload };
    case SEND_MESSAGE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const getConversationMessagesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MESSAGES_REQUEST:
      return { loading: true };
    case GET_MESSAGES_SUCCESS:
      return { loading: false, success: true, messages: action.payload };
    case GET_MESSAGES_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
