import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  initialLoginModal,
  loginModalReducer,
} from "../features/loginModalSlice";
import { initialSearch, searchReducer } from "../features/searchSlice";
import { initialPosts, postsReducer } from "../features/postsSlice";
import thunk from "redux-thunk";
import { initialPanel, panelReducer } from "../features/panelSlice";

const store = createStore(
  combineReducers({
    postsData: postsReducer,
    panel: panelReducer,
    loginModal: loginModalReducer,
    search: searchReducer,
  }),
  {
    postsData: initialPosts,
    panel: initialPanel,
    loginModal: initialLoginModal,
    search: initialSearch,
  },
  applyMiddleware(thunk)
);

export default store;
