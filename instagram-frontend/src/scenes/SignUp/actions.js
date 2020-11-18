import { API } from 'lib';
import { startLoading, stopLoading } from 'templates/components/Loading/actions';


export const signup = ({ email, username, password, fullName }) => async (dispatch, getState) => {
  const { isLoading } = getState().auth;
  const lowercaseEmail = email.toLowerCase();
  const lowercaseUsername = username.toLowerCase();

  if (isLoading) return;

  try {
    dispatch(startLoading());

    const body = {
      email: lowercaseEmail,
      username: lowercaseUsername,
      password,
      fullName,
    }

    await API({ method: 'POST', path: '/user/sign_up', body }).then(response => {
      // response code 200 - success notificaiton
      // else thor error with error message
    })
  } catch(error) {
    // dispatch error message
    dispatch(stopLoading());
  } finally {
    dispatch(stopLoading());
  }
}

export const checkAvailability = ({ email, username }) => async (dispatch, getState) => {

  const body = { email, username };

  const response = await API({ method: 'POST', path: '/user/check-availability', body });

  return response.data.taken;
} 