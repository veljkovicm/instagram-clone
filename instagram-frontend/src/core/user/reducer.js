import { actionTypes } from './actions.js';

const initialState = {
  currentUser: null,
  token: localStorage.getItem('token'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      action.data.token && localStorage.setItem('token', action.data.token)
      return {
        ...state,
        currentUser: {
          email: action.data.email,
          fullName: action.data.fullName,
          username: action.data.username,
        },
      };

    case actionTypes.CLEAR_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        currentUser: null,
      };

    default:
      return state;
  }
};
