
import { SIGN_UP, SIGN_IN_SUCCESS, SIGN_UP_FAILED, SIGN_IN, SIGN_IN_FAILED, SIGN_UP_SUCCESS, LOGOUT, LOGOUT_SUCCESS, GET_CURRENT_USER, GET_CURRENT_USER_FAILED, GET_CURRENT_USER_SUCCESS } from "./types";
import { getUser, request, register } from "./authService";
import history from '../../history';

const signUpFailed = (error) => ({ type: SIGN_UP_FAILED, payload: error });
const signInFailed = (error) => ({ type: SIGN_IN_FAILED, payload: error });

export const signUp = data => async dispatch => {
  dispatch({ type: SIGN_UP });
  try {
    const response = await register('api/auth/register', data)
    const api = await response.json();
    if (!response.ok) {
      dispatch(signUpFailed(api));
    } else {
      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: api
      });
      history.push('/login')
    }
  } catch (error) {
    dispatch(signUpFailed(error));
  }
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

export const signIn = data => async dispatch => {
  dispatch({ type: SIGN_IN });
  try {
  const response = await request('api/auth/login', data);
  const user = await response.json();
    if (!response.ok) {
        dispatch(signInFailed(user));
      } else {
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: user
        });
        localStorage.setItem("token", user.token);
        dispatch(getCurrentUser(user.user._id))
        history.push('/')
      }
  } catch (error) {
    dispatch(signInFailed(error));
  }
  
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

