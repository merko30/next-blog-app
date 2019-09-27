import Axios from "axios";

import store from "../config/store";
import { setStatus, getCurrentUser } from "../auth/auth.actions";

export default () => {
  const token = localStorage.getItem("token");

  if (token) {
    Axios.defaults.headers["authorization"] = token;
    store.dispatch(getCurrentUser());
    store.dispatch(setStatus(true));
  }
};
