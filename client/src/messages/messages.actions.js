import createAction from "utils/createAction";

export const showMessageAction = createAction("SHOW_MESSAGE");
export const clearMessageAction = createAction("CLEAR_MESSAGE");

export const showMessage = (message) => (dispatch) => {
  dispatch(showMessageAction.start(message));
  setTimeout(() => {
    dispatch(clearMessageAction.start());
  }, 5000);
};

export const clearMessage = (message) => (dispatch) => {
  dispatch(clearMessageAction.start(message));
};
