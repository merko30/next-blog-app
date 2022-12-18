import axios from "axios";

import createAction from "utils/createAction";
import populateFormData from "utils/transformObjectToFormData";
import { showMessage, clearMessage } from "../messages/messages.actions";

export const loginAction = createAction("LOGIN");
export const registerAction = createAction("REGISTER");
export const setStatusAction = createAction("SET_STATUS");
export const clearErrorAction = createAction("CLEAR_ERROR");
export const logoutAction = createAction("LOGOUT");
export const getCurrentUserAction = createAction("GET_CURRENT_USER");
export const verifyEmailAction = createAction("VERIFY_EMAIL");
export const forgotPasswordAction = createAction("FORGOT_PASSWORD");
export const resetPasswordAction = createAction("RESET_PASSWORD");
export const updateFieldAction = createAction("UPDATE_FIELD");
export const getUsersPostsAction = createAction("GET_USERS_POSTS");

const url = process.env.REACT_APP_API_URL;

export const register = async (data) =>
  await axios.post(`${url}/auth/register`, data);

export const login = async (values) =>
  await axios.post(`${url}/auth/login`, values, { withCredentials: true });

export const getCurrentUser = async () =>
  await axios.get(`${url}/auth/user`, { withCredentials: true });

export const verifyEmail = (email, token) => async (dispatch) => {
  dispatch(verifyEmailAction.start());
  try {
    const {
      data: { message },
    } = await axios.post(
      `${url}/auth/verify_email?token=${token}&email=${email}`
    );
    dispatch(verifyEmailAction.success());
    dispatch(showMessage(message));
  } catch (error) {
    dispatch(verifyEmailAction.failure(error.response.data.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordAction.start());

  try {
    const {
      data: { message },
    } = await axios.post(`${url}/auth/forgot_password`, email);
    dispatch(forgotPasswordAction.success());
    dispatch(showMessage(message));
  } catch (error) {
    dispatch(forgotPasswordAction.failure(error.response.data.message));
  }
};

export const resetPassword = (password, token) => async (dispatch) => {
  dispatch(resetPasswordAction.start());
  try {
    const {
      data: { message },
    } = await axios.post(`${url}/auth/reset_password?token=${token}`, {
      password,
    });
    dispatch(resetPasswordAction.success());
    dispatch(showMessage(message));
  } catch (error) {
    dispatch(resetPasswordAction.failure(error.response.data.message));
  }
};

export const updateField = (field, d) => async (dispatch) => {
  dispatch(updateFieldAction.start());
  try {
    const body = field === "avatar" ? populateFormData(d) : d;
    const { data } = await axios.put(`${url}/auth/update/${field}`, body);
    dispatch(updateFieldAction.success(data));
    dispatch(showMessage(data.message));
  } catch (error) {
    dispatch(updateFieldAction.failure(error.response.data.message));
  }
};

export const getUsersPosts =
  (page = 1) =>
  async (dispatch) => {
    dispatch(getUsersPostsAction.start());
    try {
      const { data } = await axios.get(`${url}/posts/user?page=${page}`);
      dispatch(getUsersPostsAction.success(data));
    } catch (error) {
      dispatch(getUsersPostsAction.failure(error.response.data.error));
    }
  };

export const clearError = () => clearErrorAction.start();

export const setStatus = (status) => setStatusAction.start(status);

export const logout = () => (dispatch) => {
  dispatch(clearMessage());
  dispatch(logoutAction.start());
  localStorage.removeItem("token");
};
