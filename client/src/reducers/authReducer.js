import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  GET_CURRENT_USER,
  GET_CURRENT_USER_FAILED,
  GET_CURRENT_USER_SUCCESS
} from "../actions/authActions/types";

const initialState = {
  isLoggedIn: false,
  error: null,
  loading: false,
  user: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
    case SIGN_IN:
    case LOGOUT:
    case GET_CURRENT_USER:
      return {
        ...state,
        loading: true
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
        isLoggedIn: true
      };
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SIGN_UP_FAILED:
    case SIGN_IN_FAILED:
    case GET_CURRENT_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.message

      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: null,
        user: null
      };
    default:
      return state;
  }
};
