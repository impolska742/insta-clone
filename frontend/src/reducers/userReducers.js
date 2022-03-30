import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  SEARCH_USERS_FAIL,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true };
    case USER_CREATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case USER_UPDATE_SUCCESS:
      return { loading: false, message: action.payload, success: true };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case USER_DELETE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { loading: true };
    case USER_DETAIL_FAIL:
      return { loading: false, error: action.payload, success: false };
    case USER_DETAIL_SUCCESS:
      return { loading: false, data: action.payload, success: true };
    default:
      return state;
  }
};

export const allUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return { loading: true };
    case ALL_USERS_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ALL_USERS_SUCCESS:
      return { loading: false, users: action.payload, success: true };
    default:
      return state;
  }
};

export const searchUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_USERS_REQUEST:
      return { loading: true };
    case SEARCH_USERS_FAIL:
      return { loading: false, error: action.payload, success: false };
    case SEARCH_USERS_SUCCESS:
      return { loading: false, users: action.payload, success: true };
    default:
      return state;
  }
};
