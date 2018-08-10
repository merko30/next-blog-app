import { createSelector } from "reselect";
import { showMessage, CLEAR_MESSAGE } from "./messagesActions";
import history from "../history";

export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILED = "GET_POSTS_FAILED";

export const GET_POST = "GET_POST";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAILED = "GET_POST_FAILED";

export const ADD_POST = "ADD_POST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILED = "ADD_POST_FAILED";

export const EDIT_POST = "EDIT_POST";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const EDIT_POST_FAILED = "EDIT_POST_FAILED";

export const SET_KEYWORD = "SET_KEYWORD";

const API_URL = "http://localhost:5000/api";

export const getPosts = () => dispatch => {
    dispatch({
        type: GET_POSTS
    });
    fetch(API_URL + "/posts", {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data =>
            dispatch({
                type: GET_POSTS_SUCCESS,
                payload: data
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
    dispatch({
        type: GET_POST
    });
    fetch(API_URL + "/posts/" + id, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data =>
            dispatch({
                type: GET_POST_SUCCESS,
                payload: data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POST_FAILED,
                payload: err
            })
        );
};

export const addPost = data => dispatch => {
    dispatch({
        type: ADD_POST
    });
    fetch(API_URL + "/posts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then(res => res.json())
        .then(json => {
            dispatch({
                type: ADD_POST_SUCCESS,
                payload: json
            });
            dispatch(showMessage(json));
            setTimeout(() => {
                history.push("/");
                dispatch({ type: CLEAR_MESSAGE });
            }, 2000);
        })
        .catch(err =>
            dispatch({
                type: ADD_POST_FAILED,
                payload: err
            })
        );
};

export const editPost = (id, data) => dispatch => {
    console.log(id, data);
    dispatch({
        type: EDIT_POST
    });
    fetch(API_URL + "/posts/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then(res => res.json())
        .then(resJSON => {
            dispatch({
                type: EDIT_POST_SUCCESS,
                payload: resJSON
            });
            dispatch(showMessage(resJSON));
            setTimeout(() => {
                history.push("/");
                dispatch({ type: CLEAR_MESSAGE });
            }, 2000);
        })
        .catch(err =>
            dispatch({
                type: EDIT_POST_FAILED,
                payload: err
            })
        );
};

export const setKeyword = keyword => dispatch => {
    dispatch({
        type: SET_KEYWORD,
        payload: keyword
    });
};

export const getKeyword = state => state.posts.keyword;
export const getAllPosts = state => state.posts.posts;

export const getPostsByKeyword = createSelector(
    [getKeyword, getAllPosts],
    (keyword, posts) => {
        return (
            keyword &&
            posts &&
            posts.filter(p => p.title.toLowerCase().includes(keyword))
        );
    }
);
