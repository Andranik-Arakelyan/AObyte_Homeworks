import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  initialLoginModal,
  loginModalReducer,
} from "../features/loginModalSlice";
import { initialSearch, searchReducer } from "../features/searchSlice";
import { initialPosts, postsReducer } from "../features/postsSlice";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({
    postsData: postsReducer,
    loginModal: loginModalReducer,
    search: searchReducer,
  }),
  {
    postsData: initialPosts,
    loginModal: initialLoginModal,
    search: initialSearch,
  },
  applyMiddleware(thunk)
);

export default store;
