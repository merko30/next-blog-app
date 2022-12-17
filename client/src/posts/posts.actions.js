import Axios from "axios";

import createAction from "../utils/createAction";
import populateFormData from "../utils/populateFormData";

export const getPostsAction = createAction("GET_POSTS");
export const getPostAction = createAction("GET_POST");
export const addPostAction = createAction("ADD_POST");
export const updatePostAction = createAction("EDIT_POST");
export const likePostAction = createAction("LIKE_POST");

const url = process.env.REACT_APP_API_URL;

export const getPosts = async (page = 1) => {
  const URL = `${url}/posts`;
  return await Axios.get(URL);
};

export const getPost = (id) => async (dispatch) => {
  dispatch(getPostAction.start());
  try {
    const {
      data: { post },
    } = await Axios.get(`${url}/posts/${id}`);
    dispatch(getPostAction.success(post));
  } catch (error) {
    dispatch(getPostAction.failure(error.response.data.message));
  }
};

export const addPost = (p) => async (dispatch) => {
  dispatch(addPostAction.start());
  try {
    const formData = populateFormData(p);
    const {
      data: { post },
    } = await Axios.post(`${url}/posts`, formData);
    dispatch(addPostAction.success(post));
    console.log(post);
  } catch (error) {
    dispatch(addPostAction.failure(error.response.data.message));
  }
};

export const updatePost = (id, p) => async (dispatch) => {
  dispatch(updatePostAction.start());
  try {
    const { image, ...rest } = p;
    const d = p.image ? populateFormData(p) : rest;
    const {
      data: { post },
    } = await Axios.put(`${url}/posts/${id}`, d);
    dispatch(updatePostAction.success(post));
  } catch (error) {
    dispatch(updatePostAction.failure(error.response.data.message));
  }
};

export const likePost = (id) => async (dispatch) => {
  dispatch(likePostAction.start());
  try {
    const {
      data: { post },
    } = await Axios.put(`${url}/posts/${id}/like`);
    dispatch(likePostAction.success(post));
  } catch (error) {
    dispatch(likePostAction.failure(error.response.data.message));
  }
};
