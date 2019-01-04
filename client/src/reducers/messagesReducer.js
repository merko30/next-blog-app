import { SHOW_MESSAGE, CLEAR_MESSAGE } from "../actions/messagesActions/types";

const initialState = {
  message: null,
  success: false
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        success: action.payload.success
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
        success: false
      };
    default:
      return state;
  }
};
