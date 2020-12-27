import { API } from 'lib';
import { setUser } from 'core/user';
import { startLoading, stopLoading } from 'components/Loading/actions';

export const login = ({ username, password, rememberMe }) => async (dispatch) => {
  const lowercaseUsername = username.toLowerCase();

  try {
    dispatch(startLoading());

    const body = {
      username: lowercaseUsername,
      password,
      rememberMe,
    }

    const response = await API({ method: 'POST', path: '/user/sign_in', body });

    dispatch(setUser(response.data.payload));

  } catch (error) {
    dispatch(stopLoading());
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
}