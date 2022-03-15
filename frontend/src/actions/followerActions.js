import axios from "axios";
import {
  CHECK_SENT_FAIL,
  CHECK_SENT_REQUEST,
  CHECK_SENT_SUCCESS,
  SEND_FOLLOW_FAIL,
  SEND_FOLLOW_REQUEST,
  SEND_FOLLOW_SUCCESS,
} from "../constants/followersConstants";

export const sendFollowRequestAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEND_FOLLOW_REQUEST,
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
      `/api/users/friend-request/send/${id}`,
      {},
      config
    );

    dispatch({
      type: SEND_FOLLOW_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SEND_FOLLOW_FAIL,
      payload: message,
    });
  }
};

export const checkSentFollowRequestAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHECK_SENT_REQUEST,
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
        `/api/users/friend-request/check/${id}`,
        config
      );

      dispatch({
        type: CHECK_SENT_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CHECK_SENT_FAIL,
        payload: message,
      });
    }
  };
