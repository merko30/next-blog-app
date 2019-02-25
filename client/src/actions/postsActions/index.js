
import { fetchPosts, fetchPost, createPost, editPostRequest } from "./postsService";
import { GET_POSTS_SUCCESS, GET_POSTS, GET_POSTS_FAILED, GET_POST, GET_POST_SUCCESS, GET_POST_FAILED, ADD_POST, ADD_POST_SUCCESS, ADD_POST_FAILED, EDIT_POST, EDIT_POST_SUCCESS, EDIT_POST_FAILED } from "./types";
import showMessageAndRedirect from "../common/showMessageAndRedirect";

const getPostsSuccess = (posts) => ({ type: GET_POSTS_SUCCESS, payload: posts }); 
const getPostsFailure = (error) => ({ type: GET_POSTS_FAILED, payload: error }); 

export const getPostSuccess = (post) => ({ type: GET_POST_SUCCESS, payload: post }); 
const getPostFailure = (error) => ({ type: GET_POST_FAILED, payload: error }); 

const createPostSuccess = () => ({ type: ADD_POST_SUCCESS }); 
const createPostFailure = (error) => ({ type: ADD_POST_FAILED, payload: error }); 



export const getPosts = () => async dispatch => {
    dispatch({ type: GET_POSTS });
    try {
     const { posts } = await fetchPosts();
     dispatch(getPostsSuccess(posts));
    } catch (error) {
     getPostsFailure(error);
    }
};

export const getPost = id => async dispatch => {
    dispatch({ type: GET_POST });
    try {
     const post = await fetchPost(id);
     dispatch(getPostSuccess(post)); 
    } catch (error) {
     dispatch(getPostFailure(error));
    }
};

export const addPost = data => async dispatch => {
    dispatch({ type: ADD_POST });
    try {
     const response = await createPost(data);
     dispatch(createPostSuccess());
     showMessageAndRedirect(response, '/')
    } catch (error) {
     createPostFailure(error);
    }
};

export const editPost = (data, id) => dispatch => {
    dispatch({ type: EDIT_POST });
    editPostRequest(data, id)
        .then(response => {
            dispatch({
                type: EDIT_POST_SUCCESS,
                payload: response
            });
            showMessageAndRedirect(response, `/posts/${id}`)
        })
        .catch(err =>
            dispatch({
                type: EDIT_POST_FAILED,
                payload: err
            })
        );
};

