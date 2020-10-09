import { actionTypes } from './actions.js';

const initialState = {
  currentUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: {
          email: action.data.email || '',
          fullName: action.data.fullName || '',
          username: action.data.username || '',
        },
      };

    case actionTypes.CLEAR_USER:
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
};
