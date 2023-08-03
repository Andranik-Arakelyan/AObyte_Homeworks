import { ASCENDING, DESCENDING } from "../constants";
import { calculateAverages, sort } from "../helpers";

const SET_PANEL = "set-panel";
const ADD_POST = "add-post";
const REMOVE_POST = "remove-post";
const CLEAR_DESK = "clear-desk";
const CHANGE_SORT_DIR = "change-sort-siraction";

export const initialPanel = {
  allPosts: [],
  leftPosts: [],
  rightPosts: [],
};

export const panelReducer = (state = {}, action) => {
  if (action.type === SET_PANEL) {
    const withAveragePosts = calculateAverages(action.payload).filter(
      (post) => post.average
    );
    return {
      ...state,
      allPosts: sort(withAveragePosts, DESCENDING, "average"),
    };
  }

  if (action.type === ADD_POST) {
    const { allPosts } = state;
    const { dir, column } = action.payload;
    if (allPosts.length) {
      let pickedPost;
      if (dir === ASCENDING) {
        pickedPost = allPosts[allPosts.length - 1];

        return {
          ...state,
          allPosts: allPosts.slice(0, -1),
          [column]: sort([...state[column], pickedPost], dir, "average"),
        };
      } else {
        pickedPost = allPosts[0];
        return {
          ...state,
          allPosts: allPosts.slice(1),
          [column]: sort([...state[column], pickedPost], dir, "average"),
        };
      }
    }
  }

  if (action.type === REMOVE_POST) {
    const { allPosts } = state;
    const { id, column } = action.payload;

    return {
      ...state,
      allPosts: sort(
        [...allPosts, state[column].find((item) => item.id === id)],
        DESCENDING,
        "average"
      ),
      [column]: state[column].filter((item) => item.id !== id),
    };
  }

  if (action.type === CLEAR_DESK) {
    const { allPosts } = state;
    const { column } = action.payload;
    return {
      ...state,
      allPosts: sort([...allPosts, ...state[column]], DESCENDING, "average"),
      [column]: [],
    };
  }

  if (action.type === CHANGE_SORT_DIR) {
    const { column, dir } = action.payload;
    return {
      ...state,
      [column]: sort(state[column], dir, "average"),
    };
  }

  return state;
};

export const setPanel = (posts) => {
  return {
    type: SET_PANEL,
    payload: posts,
  };
};

export const getPanel = (state) => {
  return state.panel;
};

export const addPost = (column, dir) => {
  return {
    type: ADD_POST,
    payload: {
      column,
      dir,
    },
  };
};

export const removePost = (column, id) => {
  return {
    type: REMOVE_POST,
    payload: {
      column,
      id,
    },
  };
};

export const clearDesk = (column) => {
  return {
    type: CLEAR_DESK,
    payload: { column },
  };
};

export const changeSortDirection = (column, dir) => {
  return {
    type: CHANGE_SORT_DIR,
    payload: {
      column,
      dir,
    },
  };
};
