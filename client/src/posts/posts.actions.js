import createAction from "../utils/createAction";
import Axios from "axios";

export const getPostsAction = createAction("GET_POSTS");
export const getPostAction = createAction("GET_POST");

export const getPosts = () => async dispatch => {
  dispatch(getPostsAction.start());
  try {
    const {
      data: { posts }
    } = await Axios.get("api/posts");
    dispatch(getPostsAction.success(posts));
  } catch (error) {
    dispatch(getPostsAction.failure(error.response.data.message));
  }
};

export const getPost = id => async dispatch => {
  dispatch(getPostAction.start());
  try {
    const {
      data: { post }
    } = await Axios.get(`/api/posts/${id}`);
    dispatch(getPostAction.success(post));
  } catch (error) {
    dispatch(getPostAction.failure(error.response.data.message));
  }
};
