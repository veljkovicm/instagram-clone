const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'auth.LOGIN_START_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'auth.LOGIN_STOP_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
