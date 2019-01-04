import {
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILED,
  REMOVE_COMMENT,
  REMOVE_COMMENT_FAILED,
  REMOVE_COMMENT_SUCCESS
} from "../actions/commentsActions/types";

const initialState = {
  loading: false,
  error: null
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_COMMENT:
    case REMOVE_COMMENT:
      return {
        ...state,
        loading: true
      };

    case ADD_COMMENT_SUCCESS:
    case REMOVE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case ADD_COMMENT_FAILED:
    case REMOVE_COMMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };


    default:
      return state;
  }
};
