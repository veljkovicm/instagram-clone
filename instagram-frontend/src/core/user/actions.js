import axios from 'axios';
import { reduxActionsGenerator } from 'lib';
import { startLoading, stopLoading} from 'components/Loading/actions';


export const actionTypes = reduxActionsGenerator([
  'SET_USER',
  'CLEAR_USER',
]);

export const clearUser = () => ({
  type: actionTypes.CLEAR_USER,
});

export const setUser = (data) => ({
  type: actionTypes.SET_USER,
  data: data,
});


export const checkUser = () => async (dispatch) => {
  dispatch(startLoading())
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  if(token) {
    config.headers['x-auth-token'] = token;
  }

  axios.get(`${process.env.REACT_APP_API_URL}/auth/check-token`, config)
  .then(response => {
    return dispatch({ type: actionTypes.SET_USER, data: response.data.payload })
  })
  .then(() => dispatch(stopLoading()))
  .catch((err) => {
    console.log('ERROR: ', err);
    dispatch(stopLoading());
  });
};

