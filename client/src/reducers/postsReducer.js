import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILED,
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_FAILED,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILED,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILED

} from "../actions/postsActions/types";

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
  keyword: null
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    case GET_POSTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_POST:
      return {
        ...state,
        loading: true
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload
      };
    case GET_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_POST:
    case ADD_POST_SUCCESS:
    case EDIT_POST:
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        loading: true
      };
    case ADD_POST_FAILED:
    case EDIT_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};
