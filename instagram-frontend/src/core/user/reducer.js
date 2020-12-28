import { actionTypes } from './actions';

const initialState = {
  currentUser: null,
  token: localStorage.getItem('token'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      action.data.token && localStorage.setItem('token', action.data.token);
      return {
        ...state,
        currentUser: {
          email: action.data.email,
          fullName: action.data.fullName,
          username: action.data.username,
          website: action.data.website,
          bio: action.data.bio,
          phoneNumber: action.data.phoneNumber,
          gender: action.data.gender,
          avatar:  action.data.avatar,
        },
      };

    case actionTypes.CLEAR_USER:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        currentUser: null,
      };

    default:
      return state;
  }
};
