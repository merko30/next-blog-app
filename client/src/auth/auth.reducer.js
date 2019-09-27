import { loginAction, registerAction, setStatusAction } from "./auth.actions";

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
        loggedIn: true
      };
    case registerAction.failure().type:
    case loginAction.failure().type:
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
    default:
      return state;
  }
};

export default authReducer;
