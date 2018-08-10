import {
  GET_COMMENTS,
  GET_COMMENTS_FAILED,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILED,
  REMOVE_COMMENT,
  REMOVE_COMMENT_FAILED,
  REMOVE_COMMENT_SUCCESS
} from "../actions/commentsActions";

const initialState = {
  comments: [],
  loading: false,
  error: null
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        loading: true
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload
      };
    case GET_COMMENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_COMMENT:
      return {
        ...state,
        loading: true
      };
    case ADD_COMMENT_SUCCESS:
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
    case REMOVE_COMMENT:
      return {
        ...state,
        loading: true
      }
    case REMOVE_COMMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        comments: state.comments.filter((c) => c._id !== action.payload)
      }
      
    }

    default:
      return state;
  }
};
