import { reduxActionsGenerator } from 'lib';

const actions = reduxActionsGenerator([
  'LOADING_START',
  'LOADING_STOP',
]);
export { actions as default };

export const startLoading = () => (dispatch) => {
  // dispatch clear notification
  dispatch({
    type: actions.LOADING_START,
  });
};

export const stopLoading = () => (dispatch) => {
  dispatch({
    type: actions.LOADING_STOP,
  });
};
