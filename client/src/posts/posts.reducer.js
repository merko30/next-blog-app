import { getPostsAction, getPostAction } from "./posts.actions";

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
  meta: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case getPostsAction.start().type:
    case getPostAction.start().type:
      return {
        ...state,
        loading: true
      };
    case getPostsAction.success().type:
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    case getPostAction.success().type:
      return {
        ...state,
        loading: false,
        post: action.payload
      };
    case getPostsAction.failure().type:
    case getPostAction.failure().type:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
