const initialState = {
  isLoading: false,
  failedLoginAttempts: 0,
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
    case 'auth.RESET_FAILED_LOGIN_ATTEMPTS':
      return {
        ...state,
        failedLoginAttempts: 0,
      };
    case 'auth.INCREMENT_FAILED_LOGIN_ATTEMPTS':
      return {
        ...state,
        failedLoginAttempts: state.failedLoginAttempts + 1,
      };
    default:
      return state;
  }
};
