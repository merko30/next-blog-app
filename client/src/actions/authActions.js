import { showMessage, CLEAR_MESSAGE } from "./messagesActions";
import history from "../history";

export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILED = "SIGN_UP_FAILED";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILED = "SIGN_IN_FAILED";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

const API_URL = "http://localhost:5000/api";

export const signUp = data => dispatch => {
  dispatch({
    type: SIGN_UP
  });
  fetch(API_URL + "/register", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json().then(api => ({ api, response })))
    .then(({ api, response }) => {
      if (!response.ok) {
        dispatch({
          type: SIGN_UP_FAILED,
          payload: api
        });
        dispatch(showMessage(api));
        setTimeout(() => {
          history.push("/login");
          dispatch({ type: CLEAR_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: api
        });
        dispatch(showMessage(api));
        setTimeout(() => {
          history.push("/login");
          dispatch({ type: CLEAR_MESSAGE });
        }, 3000);
      }
    })
    .catch(err => {
      throw err;
    });
};

export const signIn = data => dispatch => {
  dispatch({
    type: SIGN_IN
  });
  fetch(API_URL + "/login", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json().then(user => ({ user, response })))
    .then(({ user, response }) => {
      if (!response.ok) {
        dispatch({
          type: SIGN_IN_FAILED,
          payload: user
        });
        dispatch(showMessage(user));
        setTimeout(() => {
          history.push("/login");
          dispatch({ type: CLEAR_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: user
        });
        localStorage.setItem("token", JSON.stringify(user.token));
        localStorage.setItem("user", JSON.stringify(user.user));
        dispatch(showMessage(user));
        setTimeout(() => {
          history.push("/");
          dispatch({ type: CLEAR_MESSAGE });
        }, 2000);
      }
    })
    .catch(err => {
      throw err;
    });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: "You are logged out."
  });
};
