
import { SIGN_UP, SIGN_IN_SUCCESS, SIGN_UP_FAILED, SIGN_IN, SIGN_IN_FAILED, SIGN_UP_SUCCESS, LOGOUT, LOGOUT_SUCCESS, GET_CURRENT_USER, GET_CURRENT_USER_FAILED, GET_CURRENT_USER_SUCCESS } from "./types";
import { getUser, request } from "./authService";
import history from '../../history';

export const signUp = data => dispatch => {
  dispatch({ type: SIGN_UP });
  request('api/auth/register', data)
    .then(response => response.json().then(api => ({ api, response })))
    .then(({ api, response }) => {
      if (!response.ok) {
        dispatch({
          type: SIGN_UP_FAILED,
          payload: api
        });
      } else {
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: api
        });
        history.push('/login')
      }
    })
    .catch(err => {
      throw err;
    });
};

export const getCurrentUser = (id) => async (dispatch) => {
  dispatch({ type: GET_CURRENT_USER })
  try {
    let user = await getUser(id)
    dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: user.user })

  } catch (error) {
    dispatch({ type: GET_CURRENT_USER_FAILED, payload: error })
  }

}

export const signIn = data => dispatch => {
  dispatch({ type: SIGN_IN });
  return request('api/auth/login', data)
    .then(response => response.json().then(user => ({ user, response })))
    .then(({ user, response }) => {
      if (!response.ok) {
        dispatch({
          type: SIGN_IN_FAILED,
          payload: user
        });
      } else {
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: user
        });
        localStorage.setItem("token", user.token);
        dispatch(getCurrentUser(user.user._id))
        history.push('/')
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
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: "You are logged out."
  });
  history.push('/login')
};

