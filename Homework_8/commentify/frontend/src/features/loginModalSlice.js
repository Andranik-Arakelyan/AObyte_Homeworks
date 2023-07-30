const OPEN_CLOSE = "openClose";
export const initialLoginModal = {
  open: false,
};

export function loginModalReducer(state = {}, action) {
  if (action.type === OPEN_CLOSE) {
    return {
      ...state,
      open: action.payload.open,
    };
  }
  return state;
}

export const getLoginModalStatus = (state) => state.loginModal.open;

export const changeLoginModalStatus = (status) => {
  return {
    type: OPEN_CLOSE,
    payload: {
      open: status,
    },
  };
};
