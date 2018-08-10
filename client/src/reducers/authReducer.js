import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS
} from "../actions/authActions";

const initialState = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  error: null,
  loading: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
    case SIGN_IN:
    case LOGOUT:
      return {
        ...state,
        loading: true
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        success: true
      };
    case SIGN_UP_FAILED:
    case SIGN_IN_FAILED:
      return {
        ...state,
        loading: false,
        success: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: false
      };
    default:
      return state;
  }
};
