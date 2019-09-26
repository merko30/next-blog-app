import {
  addCommentAction,
  updateCommentAction,
  deleteCommentAction
} from "./comments.actions";

const initialState = {
  loading: false,
  error: null
};

export default commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case addCommentAction.start().type:
    case updateCommentAction.start().type:
    case deleteCommentAction.start().type:
      return {
        ...state,
        loading: true
      };
    case addCommentAction.success().type:
    case updateCommentAction.success().type:
    case deleteCommentAction.success().type:
      return {
        ...state,
        loading: false
      };
    case addCommentAction.failure().type:
    case updateCommentAction.failure().type:
    case deleteCommentAction.failure().type:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
