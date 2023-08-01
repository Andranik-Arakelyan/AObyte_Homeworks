import { fetchPosts } from "../api/api";
import { calculateAverages } from "../helpers";

const SET_POSTS = "set-posts";
const DISABLE_POSTS = "disable-posts";
const NO_POST = "There are not added posts yet";

export const initialPosts = { posts: [], loading: true, error: null };

export const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.payload;
    case DISABLE_POSTS:
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

    default:
      return state;
  }
};

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

export const downloadPosts = () => {
  return (dispatch) => {
    fetchPosts()
      .then((response) => {
        if (response.data) {
          dispatch(setPosts(calculateAverages(response.data), false, null));
        } else {
          dispatch(setPosts([], false, NO_POST));
        }
      })
      .catch((error) => dispatch(setPosts([], false, error.message)));
  };
};

export const getPosts = (state) => state.postsData;
