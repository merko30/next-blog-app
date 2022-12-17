import Axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const getPosts = async (page = 1) => {
  const URL = `${url}/posts`;
  return await Axios.get(URL);
};

export const getPost = async (id) => await Axios.get(`${url}/posts/${id}`);

export const addPost = async (values) =>
  await Axios.post(`${url}/posts`, values, { withCredentials: true });

export const updatePost = async (id, values) =>
  await Axios.put(`${url}/posts/${id}`, values);

export const likePost = async (id) =>
  await Axios.put(`${url}/posts/${id}/like`);
