import { API } from 'lib'
import { startLoading, stopLoading } from 'components/Loading/actions';

export const resetPassword = ({ newPassword, token }) => async (dispatch, getState) => {
  try {
    if (!token) {
      throw new Error('Invalid password token');
    }
    dispatch(startLoading());

    const body = {
      token,
      newPassword,
    }
    // TODO: export all routes to constants file?
    await API({ method: 'POST', path: '/password/reset_password', body });

  } catch (error) {
    dispatch(stopLoading());
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
}