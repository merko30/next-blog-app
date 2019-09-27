import {
  loginAction,
  registerAction,
  setStatusAction,
  clearErrorAction,
  getCurrentUserAction,
  logoutAction,
  verifyEmailAction
} from "./auth.actions";

const initialState = {
  loggedIn: false,
  error: null,
  loading: false,
  user: null,
  message: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case registerAction.start().type:
    case loginAction.start().type:
    case getCurrentUserAction.start().type:
    case verifyEmailAction.start().type:
      return {
        ...state,
        loading: true
      };
    case registerAction.success().type:
      return {
        ...state,
        loading: false,
        error: null
      };
    case loginAction.success().type:
      return {
        ...state,
        loading: false,
        error: null,
        loggedIn: true,
        user: action.payload
      };
    case registerAction.failure().type:
    case loginAction.failure().type:
    case getCurrentUserAction.failure().type:
    case verifyEmailAction.failure().type:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case setStatusAction.start().type:
      return {
        ...state,
        loggedIn: action.payload
      };
    case clearErrorAction.start().type:
      return {
        ...state,
        error: null
      };
    case getCurrentUserAction.success().type:
      return {
        ...state,
        user: action.payload,
        error: null
      };
    case logoutAction.start().type:
      return {
        ...state,
        user: null,
        loggedIn: false
      };
    case verifyEmailAction.success().type:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
