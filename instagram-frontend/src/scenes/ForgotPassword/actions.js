import { API } from 'lib';
import { startLoading, stopLoading } from 'templates/components/Loading/actions';

export const forgotPassword = ({ email }) => async (dispatch, getState) => {
  const  { isLoading } = getState().auth;
  const lowercaseEmail = email.toLowerCase();

  if (isLoading) return;

  try {
    dispatch(startLoading());

    const body = { email: lowercaseEmail }
    // export all routes to constants file?
    await API({ method: 'POST', path: '/password/forgot_password', body })

  } catch (error) {
    // dispatch error message
    dispatch(stopLoading());
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
}
