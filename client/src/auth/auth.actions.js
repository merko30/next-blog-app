import axios from "axios";

import history from "../config/history";

import createAction from "../utils/createAction";
import populateFormData from "../utils/populateFormData";
import storeToken from "../utils/storeToken";

export const loginAction = createAction("LOGIN");
export const registerAction = createAction("REGISTER");

export const register = data => async dispatch => {
  dispatch(registerAction.start());
  try {
    let formData = populateFormData(data);
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
      data: { token }
    } = await axios.post("api/auth/login", data);
    dispatch(loginAction.success());
    storeToken(token);
    history.push("/");
  } catch (error) {
    dispatch(loginAction.failure(error.response.data.message));
  }
};
