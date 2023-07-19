import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchPosts = () => api.get("/posts");

export const addPost = (postData) => api.post("/posts", postData);

export const addComment = async (postId, commentData) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    return response;
  } catch (error) {
    throw new Error("Error adding comment");
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    const response = api.delete(`/posts/${postId}/comments/${commentId}`);
    return response;
  } catch (err) {
    throw new Error("Error deleting comment");
  }
};
