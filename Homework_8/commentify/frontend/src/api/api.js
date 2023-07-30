import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const fetchPosts = () => api.get("/posts");

export const fetchPostDetails = (postId) => api.get(`posts/${postId}`);

export const addPostWithImage = async ({ title, description, image }) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    const response = await api.post(`/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("In api js:", error);
    throw error;
  }
};

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
