import Axios from "axios";

import createAction from "../utils/createAction";
import populateFormData from "../utils/populateFormData";
import history from "../config/history";

export const getPostsAction = createAction("GET_POSTS");
export const getPostAction = createAction("GET_POST");
export const addPostAction = createAction("ADD_POST");
export const updatePostAction = createAction("EDIT_POST");

const url = process.env.REACT_APP_API_URL;

export const getPosts = (page = 1) => async dispatch => {
  const URL = page ? `${url}/posts?page=${page}` : `${url}/posts`;
  dispatch(getPostsAction.start());
  try {
    const { data } = await Axios.get(URL);
    dispatch(getPostsAction.success(data));
  } catch (error) {
    dispatch(getPostsAction.failure(error.response.data.message));
  }
};

export const getPost = id => async dispatch => {
  dispatch(getPostAction.start());
  try {
    const {
      data: { post }
    } = await Axios.get(`${url}/posts/${id}`);
    dispatch(getPostAction.success(post));
  } catch (error) {
    dispatch(getPostAction.failure(error.response.data.message));
  }
};

export const addPost = p => async dispatch => {
  dispatch(addPostAction.start());
  try {
    const formData = populateFormData(p);
    const {
      data: { post }
    } = await Axios.post(`${url}/posts`, formData);
    dispatch(addPostAction.success(post));
    history.push(`/posts/${post._id}`);
  } catch (error) {
    dispatch(addPostAction.failure(error.response.data.message));
  }
};

export const updatePost = (id, p) => async dispatch => {
  dispatch(updatePostAction.start());
  try {
    const formData = populateFormData(p);
    const {
      data: { post }
    } = await Axios.put(`${url}/posts/${id}`, formData);
    dispatch(updatePostAction.success(post));
    history.push(`/posts/${post._id}`);
  } catch (error) {
    dispatch(updatePostAction.failure(error.response.data.message));
  }
};
