// import { reduxActionsGenerator } from '@src/lib';
import { reduxActionsGenerator } from '../../lib/';
import axios from 'axios';


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



export const checkUser = () => async (dispatch, getState) => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  if(token) {
    config.headers['x-auth-token'] = token;
  }

   axios.get('http://localhost:5000/auth/check-token', config)
    .then(response => {
      dispatch({ type: actionTypes.SET_USER, data: response.data.payload })
    })
    .catch(err => console.log('ERROR: ', err));
}