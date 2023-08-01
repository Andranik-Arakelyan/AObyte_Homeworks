const CHANGE_SEARCH_VALUE = "changeSearchValue";

export const initialSearch = {
  value: "",
};

export function searchReducer(state = {}, action) {
  if (action.type === CHANGE_SEARCH_VALUE) {
    return { ...state, value: action.payload };
  }
  return state;
}

export const setSearchValue = (value) => {
  return {
    type: CHANGE_SEARCH_VALUE,
    payload: value,
  };
};

export const getSearchValue = (state) => state.search.value;
