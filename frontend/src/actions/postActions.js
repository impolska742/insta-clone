import {
  ALL_POSTS_FAIL,
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
} from "../constants/postConstants";
import axios from "axios";

export const getAllPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_POSTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`api/users/friends-posts`, config);

    dispatch({
      type: ALL_POSTS_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ALL_POSTS_FAIL,
      payload: message,
    });
  }
};
