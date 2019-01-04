
import { ADD_COMMENT, ADD_COMMENT_FAILED, ADD_COMMENT_SUCCESS, REMOVE_COMMENT, REMOVE_COMMENT_FAILED } from "./types";
import { createComment, deleteComment } from "./commentsService";
import { getPost } from "../postsActions/postsActions";


export const addComment = (postID, data) => dispatch => {
  dispatch({ type: ADD_COMMENT });
  createComment(postID, data)
    .then(data =>
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: data
      })
    ).then(() => {
      dispatch(getPost(postID))
    })
    .catch(err =>
      dispatch({
        type: ADD_COMMENT_FAILED,
        payload: err
      })
    );
};

export const removeComment = (commentID, postID) => (dispatch) => {
  dispatch({ type: REMOVE_COMMENT });
  deleteComment(commentID, postID)
    .then(() => {
      dispatch(getPost(postID))
    }).catch(error => {
      dispatch({
        type: REMOVE_COMMENT_FAILED,
        payload: error
      })
    })

}
