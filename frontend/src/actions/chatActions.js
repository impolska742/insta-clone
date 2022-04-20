import axios from "axios";
import {
  ACCESS_CHAT_FAIL,
  ACCESS_CHAT_REQUEST,
  ACCESS_CHAT_SUCCESS,
  CREATE_GROUP_CHAT_FAIL,
  CREATE_GROUP_CHAT_REQUEST,
  CREATE_GROUP_CHAT_SUCCESS,
  FETCH_CHATS_FAIL,
  FETCH_CHATS_REQUEST,
  FETCH_CHATS_SUCCESS,
  UPDATE_GROUP_CHAT_REQUEST,
  UPDATE_GROUP_CHAT_SUCCESS,
  UPDATE_GROUP_CHAT_FAIL,
  DELETE_GROUP_CHAT_REQUEST,
  DELETE_GROUP_CHAT_SUCCESS,
  DELETE_GROUP_CHAT_FAIL,
  DELETE_NORMAL_CHAT_REQUEST,
  DELETE_NORMAL_CHAT_SUCCESS,
  DELETE_NORMAL_CHAT_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  ALL_MESSAGES_REQUEST,
  ALL_MESSAGES_SUCCESS,
  ALL_MESSAGES_FAIL,
} from "../constants/chatConstants";
import { socket } from "../socket";

export const accessChatAction = (user_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCESS_CHAT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/chat`, { user_id }, config);
    console.log(data);

    dispatch({ type: ACCESS_CHAT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ACCESS_CHAT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const fetchChatsAction = (setChats) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_CHATS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/chat`, config);

    setChats(data);

    dispatch({ type: FETCH_CHATS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: FETCH_CHATS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createGroupChatAction =
  (name, chatUsers) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_GROUP_CHAT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const users = JSON.stringify(chatUsers.map((u) => u._id));

      const { data } = await axios.post(
        `/api/chat/group`,
        {
          users,
          name,
        },
        config
      );

      dispatch({ type: CREATE_GROUP_CHAT_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: CREATE_GROUP_CHAT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const updateGroupChatAction =
  (chatId, chatName, chatUsers) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_GROUP_CHAT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const users = JSON.stringify(chatUsers.map((u) => u._id));

      console.log(users, chatName);

      const { data } = await axios.put(
        `/api/chat/update-group`,
        {
          chatId,
          users,
          chatName,
        },
        config
      );

      dispatch({ type: UPDATE_GROUP_CHAT_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: UPDATE_GROUP_CHAT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const deleteGroupChatAction = (chatId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_GROUP_CHAT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/chat/delete-group/${chatId}`,
      config
    );

    dispatch({ type: DELETE_GROUP_CHAT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: DELETE_GROUP_CHAT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteNormalChatAction =
  (chatId) => async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_NORMAL_CHAT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(
        `/api/chat/delete-normal/${chatId}`,
        config
      );

      dispatch({ type: DELETE_NORMAL_CHAT_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: DELETE_NORMAL_CHAT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const sendMessageAction =
  (chatId, content) => async (dispatch, getState) => {
    try {
      dispatch({ type: SEND_MESSAGE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/message`,
        { chatId, content },
        config
      );

      socket.emit("new message", data);

      dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: SEND_MESSAGE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const allMessagesAction =
  (chatId, setMessages) => async (dispatch, getState) => {
    try {
      dispatch({ type: ALL_MESSAGES_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/message/${chatId}`, config);

      setMessages(data);

      socket.emit("join chat", chatId);

      dispatch({ type: ALL_MESSAGES_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ALL_MESSAGES_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
