import { combineReducers, createStore } from "redux";
import {
  initialLoginModal,
  loginModalReducer,
} from "../features/loginModalSlice";
import { initialSearch, searchReducer } from "../features/searchSlice";

const store = createStore(
  combineReducers({
    loginModal: loginModalReducer,
    search: searchReducer,
  }),
  {
    loginModal: initialLoginModal,
    search: initialSearch,
  }
);

export default store;
