export const SHOW_MESSAGE = "SHOW_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const showMessage = response => dispatch => {
  dispatch({
    type: SHOW_MESSAGE,
    payload: response
  });
};

export const getMessage = state => state.messages.message;
export const getSuccess = state => state.messages.success;
