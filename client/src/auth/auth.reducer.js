import {
  loginAction,
  registerAction,
  setStatusAction,
  clearErrorAction,
  getCurrentUserAction,
  logoutAction
} from "./auth.actions";

const initialState = {
  loggedIn: false,
  error: null,
  loading: false,
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case registerAction.start().type:
    case loginAction.start().type:
    case getCurrentUserAction.start().type:
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
    default:
      return state;
  }
};

export default authReducer;
