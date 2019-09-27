import Axios from "axios";

const setHeader = () =>
  (Axios.defaults.headers["authorization"] = localStorage.getItem("token"));

export default setHeader;
