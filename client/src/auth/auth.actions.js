import axios from "axios";

import history from "../config/history";
import createAction from "../utils/createAction";
import populateFormData from "../utils/populateFormData";
import storeToken from "../utils/storeToken";
import setHeader from "../utils/setHeader";

export const loginAction = createAction("LOGIN");
export const registerAction = createAction("REGISTER");
export const setStatusAction = createAction("SET_STATUS");
export const clearErrorAction = createAction("CLEAR_ERROR");
export const logoutAction = createAction("LOGOUT");
export const getCurrentUserAction = createAction("GET_CURRENT_USER");
export const verifyEmailAction = createAction("VERIFY_EMAIL");

export const register = data => async dispatch => {
  dispatch(registerAction.start());
  try {
    const formData = populateFormData(data);
    await axios.post("api/auth/register", formData);
    dispatch(registerAction.success());
    history.push("/login");
  } catch (error) {
    dispatch(registerAction.failure(error.response.data.message));
  }
};

export const login = data => async dispatch => {
  dispatch(loginAction.start());
  try {
    const {
      data: { token, user }
    } = await axios.post("api/auth/login", data);
    dispatch(loginAction.success(user));
    storeToken(token);
    setHeader();
    history.push("/");
  } catch (error) {
    dispatch(loginAction.failure(error.response.data.message));
  }
};

export const getCurrentUser = () => async dispatch => {
  dispatch(getCurrentUserAction.start());

  try {
    const {
      data: { user }
    } = await axios.get("/api/auth/user");
    dispatch(getCurrentUserAction.success(user));
  } catch (error) {
    dispatch(getCurrentUserAction.failure(error.response.data.message));
  }
};

export const verifyEmail = (email, token) => async dispatch => {
  dispatch(verifyEmailAction.start());
  try {
    const {
      data: { message }
    } = await axios.post(
      `/api/auth/verify_email?token=${token}&email=${email}`
    );
    console.log(message);
    dispatch(verifyEmailAction.success(message));
    history.push("/login");
  } catch (error) {
    dispatch(verifyEmailAction.failure(error.response.data.message));
  }
};

export const clearError = () => clearErrorAction.start();

export const setStatus = status => setStatusAction.start(status);

export const logout = () => dispatch => {
  dispatch(logoutAction.start());
  localStorage.removeItem("token");
  history.push("/login");
};
