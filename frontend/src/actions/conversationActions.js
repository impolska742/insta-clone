import {
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_FAIL,
  GET_CONVERSATION_REQUEST,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
} from "../constants/conversationConstants";
import axios from "axios";
import { socket } from "../socket.js";

export const getConversationAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CONVERSATION_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/conversation/${id}`, config);

    socket.emit("join chat", data?.conversation?._id);

    dispatch({
      type: GET_CONVERSATION_SUCCESS,
      payload: data.conversation,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_CONVERSATION_FAIL,
      payload: message,
    });
  }
};

export const sendMessageAction =
  (id, content, media) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SEND_MESSAGE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/conversation/${id}`,
        {
          content,
          media,
        },
        config
      );

      // console.log(data);

      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SEND_MESSAGE_FAIL,
        payload: message,
      });
    }
  };

export const getConversationMessagesAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_MESSAGES_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/conversation/${id}/messages`,
        config
      );

      console.log(data);

      dispatch({
        type: GET_MESSAGES_SUCCESS,
        payload: data.messages,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GET_MESSAGES_FAIL,
        payload: message,
      });
    }
  };