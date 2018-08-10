import { createSelector } from "reselect";

export const GET_COMMENTS = "GET_COMMENTS";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
export const GET_COMMENTS_FAILED = "GET_COMMENTS_FAILED";

export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILED = "ADD_COMMENT_FAILED";

export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILED = 'REMOVE_COMMENT_FAILED';

const API_URL = "http://localhost:5000/api";

export const getComments = () => dispatch => {
  dispatch({
    type: GET_COMMENTS
  });
  fetch(`${API_URL}/comments`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COMMENTS_FAILED,
        payload: err
      })
    );
};

export const addComment = (id, data) => dispatch => {
  dispatch({
    type: ADD_COMMENT
  });
  fetch(`${API_URL}/posts/${id}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("token")),
      "Access-Control-Allow-Origin": "*"
    }
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: data
      })
    )
    .then(() => dispatch(getComments()))
    .catch(err =>
      dispatch({
        type: ADD_COMMENT_FAILED,
        payload: err
      })
    );
};

export const removeComment = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_COMMENT,
  });
  fetch(`${API_URL}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
       Authorization: JSON.parse(localStorage.getItem("token")),
       "Access-Control-Allow-Origin": "*"
    }
  }).then(success => {
    dispatch({
      type: REMOVE_COMMENT_SUCCESS,
      payload: id
    })
  }).catch(error => {
    dispatch({
      type: REMOVE_COMMENT_FAILED,
      payload: error
    })
  })
  
}

const getAllComments = state => state.comments.comments;
const getPost = state => state.posts.post;

export const getCommentsByPostID = createSelector(
  [getAllComments, getPost],
  (comments, post) => {
    return comments && post ? comments.filter(c => c.postID === post._id) : [];
  }
);
