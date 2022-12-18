import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const addComment = async (data) =>
  await axios.post(`${url}/comments`, data, { withCredentials: true });

export const updateComment = async (commentId, values) =>
  await axios.put(`${url}/comments/${commentId}`, values, {
    withCredentials: true,
  });

export const deleteComment = async (commentId) =>
  await axios.delete(`${url}/comments/${commentId}`, { withCredentials: true });
