import axios from "axios";

import createAction from "../utils/createAction";

export const addCommentAction = createAction("ADD_COMMENT");
export const updateCommentAction = createAction("UPDATE_COMMENT");
export const deleteCommentAction = createAction("DELETE_COMMENT");

const url = process.env.REACT_APP_API_URL;

export const addComment = async (data) =>
  await axios.post(`${url}/comments`, data, { withCredentials: true });

export const updateComment = (postID, commentID, c) => async (dispatch) => {
  dispatch(updateCommentAction.start());

  try {
    const response = await axios.put(
      `${url}/comments/${postID}/${commentID}`,
      c
    );
    const { comment } = response.data;
    dispatch(updateCommentAction.success(comment));
  } catch (error) {
    dispatch(updateCommentAction.failure(error.response.data.error));
  }
};
