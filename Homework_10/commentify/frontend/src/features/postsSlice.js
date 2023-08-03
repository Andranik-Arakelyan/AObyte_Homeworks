import {
  addComment,
  deleteComment,
  fetchPosts,
  replyToComment,
} from "../api/api";
import { calculateAverages } from "../helpers";
import { setPanel } from "./panelSlice";

const SET_POSTS = "set-posts";
const DISABLE_POSTS = "disable-posts";
const NO_POST = "There are not added posts yet";
const UPDATE_COMMENTS = "update-comments";
const UPDATE_REPLIES = "update-replies";

export const initialPosts = { posts: [], loading: true, error: null };

export const postsReducer = (state = {}, action) => {
  if (action.type === SET_POSTS) {
    return action.payload;
  }

  if (action.type === DISABLE_POSTS) {
    const newPosts = [...state.posts];

    action.payload.forEach((disabling) => {
      const index = state.posts.findIndex((post) => post.id === disabling.id);

      newPosts[index] = {
        ...newPosts[index],
        selected: disabling.status,
      };
    });
    return {
      ...state,
      posts: newPosts,
    };
  }

  if (action.type === UPDATE_COMMENTS) {
    const postIndex = state.posts.findIndex(
      (post) => (post.id = action.payload.id)
    );

    const newPosts = [...state.posts];

    newPosts[postIndex] = {
      ...newPosts[postIndex],
      comments: action.payload.updatedComs,
    };

    return {
      ...state,
      posts: newPosts,
    };
  }

  if (action.type === UPDATE_REPLIES) {
    const newPosts = [...state.posts];

    const postIndex = newPosts.findIndex(
      (post) => post.id === action.payload.postId
    );

    const comments = [...newPosts[postIndex].comments];

    const commentIndex = newPosts[postIndex].comments.findIndex(
      (com) => com.id === action.payload.commentId
    );
    comments[commentIndex] = {
      ...comments[commentIndex],
      replies: action.payload.updateReplies,
    };

    newPosts[postIndex] = {
      ...newPosts[postIndex],
      comments: comments,
    };

    return {
      ...state,
      posts: newPosts,
    };
  }

  return state;
};

export const downloadPosts = () => {
  return (dispatch) => {
    fetchPosts()
      .then((response) => {
        if (response.data) {
          dispatch(setPosts(calculateAverages(response.data), false, null));
          dispatch(setPanel(response.data));
        } else {
          dispatch(setPosts([], false, NO_POST));
        }
      })
      .catch((error) => dispatch(setPosts([], false, error.message)));
  };
};

export const getPosts = (state) => state.postsData;

export const setPosts = (posts, status, error) => {
  return {
    type: SET_POSTS,
    payload: { posts, loading: status, error },
  };
};

export const disablePost = (arrOfDisablings) => {
  return {
    type: DISABLE_POSTS,
    payload: arrOfDisablings,
  };
};

export const deleteCom = (postId, commentId) => {
  return (dispatch) => {
    deleteComment(postId, commentId)
      .then((response) => {
        dispatch(updateComments(postId, response.data));
      })
      .catch((err) => console.log(err));
  };
};

export const addCom = (id, newComment) => {
  return async (dispatch) => {
    const updatedComs = await addComment(id, newComment);
    dispatch(updateComments(id, updatedComs));
  };
};

export const updateComments = (id, updatedComs) => {
  return {
    type: UPDATE_COMMENTS,
    payload: {
      id,
      updatedComs,
    },
  };
};

export const addReply = (postId, commentId, newReply) => {
  return (dispatch) => {
    replyToComment(postId, commentId, newReply).then((updatedReplies) => {
      dispatch(updateReplies(postId, commentId, updatedReplies));
    });
  };
};

export const updateReplies = (postId, commentId, updatedReplies) => {
  return {
    type: UPDATE_REPLIES,
    payload: {
      postId,
      commentId,
      updateReplies,
    },
  };
};
