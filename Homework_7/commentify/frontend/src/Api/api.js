import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchPosts = () => api.get("/posts");

export const fetchPostDetails = (postId) => api.get(`posts/${postId}`);

export const addPost = (postData) => api.post("/posts", postData);

export const addComment = async (postId, commentData) => {
  try {
    return await api.post(`/posts/${postId}/comments`, commentData);
  } catch (error) {
    throw new Error("Error adding comment");
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    return await api.delete(`/posts/${postId}/comments/${commentId}`);
  } catch (err) {
    throw new Error("Error deleting comment");
  }
};
