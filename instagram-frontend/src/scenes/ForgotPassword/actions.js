import { API } from 'lib';
import { startLoading, stopLoading } from 'components/Loading/actions';

export const forgotPassword = ({ email }) => async (dispatch, getState) => {
  const lowercaseEmail = email.toLowerCase();

  try {
    dispatch(startLoading());

    const body = { email: lowercaseEmail }
    // export all routes to constants file?
    await API({ method: 'POST', path: '/password/forgot_password', body })

  } catch (error) {
    dispatch(stopLoading());
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
}
