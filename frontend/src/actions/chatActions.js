import axios from "axios";
import {
  ACCESS_CHAT_FAIL,
  ACCESS_CHAT_REQUEST,
  ACCESS_CHAT_SUCCESS,
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
