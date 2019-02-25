
import { ADD_COMMENT, ADD_COMMENT_FAILED, ADD_COMMENT_SUCCESS, REMOVE_COMMENT, REMOVE_COMMENT_FAILED } from "./types";
import { createComment, deleteComment } from "./commentsService";
import { getPostSuccess } from "../postsActions";

const addCommentSuccess = () => ({ type: ADD_COMMENT_SUCCESS });
const addCommentFailure = (error) => ({ type: ADD_COMMENT_FAILED, payload: error });
const removeCommentError = (error) => ({ type: REMOVE_COMMENT_FAILED, payload: error });


export const addComment = (postID, data) => async (dispatch, getState) => {
  dispatch({ type: ADD_COMMENT });
  try {
    const response = await createComment(postID, data);
    dispatch(addCommentSuccess());
    const post = getState().posts.post;
    post.comments.push(response.comment);
    dispatch(getPostSuccess({...post}));
  } catch (error) {
    addCommentFailure(error);
  }
};

export const removeComment = (commentID, postID) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_COMMENT });
  try {
    await deleteComment(commentID, postID);
    const post = getState().posts.post;
    post.comments = post.comments.filter(c => c._id !== commentID);
    dispatch(getPostSuccess({...post}));
  } catch (error) {
    removeCommentError(error);    
  }

}
