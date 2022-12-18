import {
  getPostsAction,
  getPostAction,
  addPostAction,
  updatePostAction,
  likePostAction,
} from "./posts.actions";
import {
  addCommentAction,
  updateCommentAction,
} from "comments/comments.actions";

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
  meta: {
    numberOfPages: 1,
    currentPage: 1,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getPostsAction.start().type:
    case getPostAction.start().type:
    case addPostAction.start().type:
    case updatePostAction.start().type:
    case likePostAction.start().type:
      return {
        ...state,
        loading: true,
      };
    case getPostsAction.success().type:
      const { posts, numberOfPages, currentPage } = action.payload;
      return {
        ...state,
        loading: false,
        posts,
        meta: {
          numberOfPages,
          currentPage,
        },
      };
    case getPostAction.success().type:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case addPostAction.success().type:
    case updatePostAction.success().type:
      return {
        ...state,
        loading: false,
      };
    case getPostsAction.failure().type:
    case getPostAction.failure().type:
    case addPostAction.failure().type:
    case updatePostAction.failure().type:
    case likePostAction.failure().type:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case addCommentAction.success().type:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [...state.post.comments, action.payload],
        },
      };
    case updateCommentAction.success().type:
      const updatedComments = state.post.comments.slice();
      const index = updatedComments.findIndex(
        (c) => c._id === action.payload._id
      );
      updatedComments[index] = action.payload;
      return {
        ...state,
        post: {
          ...state.post,
          comments: updatedComments,
        },
      };
    case likePostAction.success().type:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
