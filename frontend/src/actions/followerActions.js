import axios from "axios";
import {
  ACCEPT_FOLLOW_FAIL,
  ACCEPT_FOLLOW_REQUEST,
  ACCEPT_FOLLOW_SUCCESS,
  ALL_REQUESTS_FAIL,
  ALL_REQUESTS_REQUEST,
  ALL_REQUESTS_SUCCESS,
  ALREADY_FOLLOWING_FAIL,
  ALREADY_FOLLOWING_REQUEST,
  ALREADY_FOLLOWING_SUCCESS,
  CHECK_SENT_FAIL,
  CHECK_SENT_REQUEST,
  CHECK_SENT_SUCCESS,
  GET_FOLLOWING_FAIL,
  GET_FOLLOWING_REQUEST,
  GET_FOLLOWING_SUCCESS,
  REJECT_FOLLOW_FAIL,
  REJECT_FOLLOW_REQUEST,
  REJECT_FOLLOW_SUCCESS,
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
        payload: data.requestStatus,
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

export const getAllFollowRequestsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_REQUESTS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/friend-request/all`, config);

    dispatch({
      type: ALL_REQUESTS_SUCCESS,
      payload: data.requests,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ALL_REQUESTS_FAIL,
      payload: message,
    });
  }
};

export const acceptFollowRequestAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCEPT_FOLLOW_REQUEST,
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
      `/api/users/friend-request/accept/${id}`,
      {},
      config
    );

    dispatch({
      type: ACCEPT_FOLLOW_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ACCEPT_FOLLOW_FAIL,
      payload: message,
    });
  }
};

export const rejectFollowRequestAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REJECT_FOLLOW_REQUEST,
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
      `/api/users/friend-request/reject/${id}`,
      {},
      config
    );

    dispatch({
      type: REJECT_FOLLOW_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: REJECT_FOLLOW_FAIL,
      payload: message,
    });
  }
};

export const alreadyFollowingAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALREADY_FOLLOWING_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // /api/users/friend-request/following/:id

    const { data } = await axios.get(
      `/api/users/friend-request/following/${id}`,
      config
    );

    dispatch({
      type: ALREADY_FOLLOWING_SUCCESS,
      payload: data.alreadyFollowing,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ALREADY_FOLLOWING_FAIL,
      payload: message,
    });
  }
};

export const getUserFollowingAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_FOLLOWING_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/user-friends`, config);

    dispatch({
      type: GET_FOLLOWING_SUCCESS,
      payload: data.friends,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_FOLLOWING_FAIL,
      payload: message,
    });
  }
};
