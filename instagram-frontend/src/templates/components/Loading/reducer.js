import actionTypes from './actions.js';

const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOADING_STOP:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
