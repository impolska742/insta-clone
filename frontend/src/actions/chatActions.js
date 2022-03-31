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
} from "../constants/chatConstants";

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

export const fetchChatsAction = () => async (dispatch, getState) => {
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
