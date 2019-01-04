
import { fetchPosts, fetchPost, createPost, editPostRequest } from "./postsService";
import { GET_POSTS_SUCCESS, GET_POSTS, GET_POSTS_FAILED, GET_POST, GET_POST_SUCCESS, GET_POST_FAILED, ADD_POST, ADD_POST_SUCCESS, ADD_POST_FAILED, EDIT_POST, EDIT_POST_SUCCESS, EDIT_POST_FAILED } from "./types";
import showMessageAndRedirect from "../common/showMessageAndRedirect";

export const getPosts = () => dispatch => {
    dispatch({ type: GET_POSTS });
    fetchPosts()
        .then(data =>
            dispatch({
                type: GET_POSTS_SUCCESS,
                payload: data.posts
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POSTS_FAILED,
                payload: err
            })
        );
};

export const getPost = id => dispatch => {
    dispatch({ type: GET_POST });
    fetchPost(id).then(data =>
        dispatch({
            type: GET_POST_SUCCESS,
            payload: data
        }))
        .catch(err =>
            dispatch({
                type: GET_POST_FAILED,
                payload: err
            })
        );
};

export const addPost = data => dispatch => {
    dispatch({ type: ADD_POST });
    createPost(data)
        .then(json => {
            dispatch({
                type: ADD_POST_SUCCESS,
                payload: json
            });
            showMessageAndRedirect(json, '/')
        })
        .catch(err =>
            dispatch({
                type: ADD_POST_FAILED,
                payload: err
            })
        );
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

