import { showMessageAction, clearMessageAction } from "./messages.actions";

const initialState = {
  message: null
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case showMessageAction.start().type:
      return {
        message: action.payload
      };
    case clearMessageAction.start().type:
      return {
        message: null
      };

    default:
      return state;
  }
};

export default messagesReducer;
