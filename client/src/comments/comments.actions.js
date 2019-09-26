import axios from "axios";

import createAction from "../utils/createAction";

export const addCommentAction = createAction("ADD_COMMENT");
export const updateCommentAction = createAction("UPDATE_COMMENT");
export const deleteCommentAction = createAction("DELETE_COMMENT");

export const addComment = (postID, c) => async dispatch => {
  dispatch(addCommentAction.start());

  try {
    const response = await axios.post(`/api/comments/${postID}`, c);
    const { comment } = response.data;
    dispatch(addCommentAction.success(comment));
  } catch (error) {
    dispatch(addCommentAction.failure(error.response.data.error));
  }
};

export const updateComment = (postID, commentID, c) => async dispatch => {
  dispatch(updateCommentAction.start());

  try {
    const response = await axios.put(`/api/comments/${postID}/${commentID}`, c);
    const { comment } = response.data;
    dispatch(updateCommentAction.success(comment));
  } catch (error) {
    dispatch(updateCommentAction.failure(error.response.data.error));
  }
};
