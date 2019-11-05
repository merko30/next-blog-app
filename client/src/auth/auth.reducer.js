import {
  loginAction,
  registerAction,
  setStatusAction,
  clearErrorAction,
  getCurrentUserAction,
  logoutAction,
  verifyEmailAction,
  resetPasswordAction,
  forgotPasswordAction,
  updateFieldAction,
  getUsersPostsAction
} from "./auth.actions";

const initialState = {
  loggedIn: false,
  error: null,
  loading: false,
  user: null,
  warning: null,
  message: null,
  posts: {
    posts: [],
    numberOfPages: null
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case registerAction.start().type:
    case loginAction.start().type:
    case getCurrentUserAction.start().type:
    case verifyEmailAction.start().type:
    case resetPasswordAction.start().type:
    case forgotPasswordAction.start().type:
    case updateFieldAction.start().type:
    case getUsersPostsAction.start().type:
      return {
        ...state,
        loading: true
      };
    case registerAction.success().type:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload
      };
    case forgotPasswordAction.success().type:
    case resetPasswordAction.success().type:
      return {
        ...state,
        loading: false,
        error: null
      };
    case verifyEmailAction.success().type:
      return {
        ...state,
        loading: false,
        error: null,
        warning: null
      };
    case updateFieldAction.success().type:
      return {
        ...state,
        user: action.payload.user,
        loading: false
      };
    case loginAction.success().type:
      const { message, user } = action.payload;
      return {
        ...state,
        loading: false,
        error: null,
        loggedIn: true,
        user,
        warning: message ? message : null,
        message: null
      };
    case registerAction.failure().type:
    case loginAction.failure().type:
    case getCurrentUserAction.failure().type:
    case verifyEmailAction.failure().type:
    case resetPasswordAction.failure().type:
    case forgotPasswordAction.failure().type:
    case updateFieldAction.failure().type:
    case getUsersPostsAction.failure().type:
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
    case getUsersPostsAction.success().type:
      return {
        ...state,
        posts: {
          posts: action.payload.posts,
          numberOfPages: action.payload.numberOfPages
        },
        loading: false
      };
    case getCurrentUserAction.success().type:
      return {
        ...state,
        user: action.payload.user,
        error: null,
        loading: false,
        warning: action.payload.message ? action.payload.message : null
      };
    case logoutAction.start().type:
      return {
        ...state,
        user: null,
        loggedIn: false,
        warning: null
      };

    default:
      return state;
  }
};

export default authReducer;
