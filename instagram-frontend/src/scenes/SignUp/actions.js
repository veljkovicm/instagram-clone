import { API } from 'lib';
import { startLoading, stopLoading } from 'templates/components/Loading/actions';


export const signup = ({ email, username, password, fullName }) => async (dispatch, getState) => {
  const lowercaseEmail = email.toLowerCase();
  const lowercaseUsername = username.toLowerCase();

  try {
    dispatch(startLoading());

    const body = {
      email: lowercaseEmail,
      username: lowercaseUsername,
      password,
      fullName,
    }

    await API({ method: 'POST', path: '/user/sign_up', body });

  } catch(error) {
    dispatch(stopLoading());
  } finally {
    dispatch(stopLoading());
  }
}

export const checkAvailability = ({ email, username }) => async () => {
  const body = { email, username };
  const response = await API({ method: 'POST', path: '/user/check-availability', body });

  return response.data.taken;
} 