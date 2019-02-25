import { SHOW_MESSAGE } from './types'

export const showMessage = response => dispatch => {
  dispatch({
    type: SHOW_MESSAGE,
    payload: response
  });
};

