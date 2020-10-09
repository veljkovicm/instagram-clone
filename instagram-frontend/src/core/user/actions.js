// import { reduxActionsGenerator } from '@src/lib';
import { reduxActionsGenerator } from '../../lib/';


export const actionTypes = reduxActionsGenerator([
  'SET_USER',
  'CLEAR_USER',
]);

export const clearUser = () => ({
  type: actionTypes.CLEAR_USER,
});

export const setUser = (user) => ({
  type: actionTypes.SET_USER,
  data: user,
});
