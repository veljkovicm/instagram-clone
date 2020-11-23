import { API } from 'lib'
import { startLoading, stopLoading } from 'templates/components/Loading/actions';

export const resetPassword = ({ newPassword, token }) => async (dispatch, getState) => {
  const  { isLoading } = getState().auth;

  if (isLoading) return;

  try {
    if (!token) {
      throw new Error('Invalid password token');
    }
    dispatch(startLoading());

    const body = {
      token,
      newPassword,
    }
    // export all routes to constants file?
    await API({ method: 'POST', path: '/password/reset_password', body }).then(response => {
      return response;
    });
    

    // success notification on 200
    // error notification if token is not valid anymore


  } catch (error) {
    // dispatch error message
    dispatch(stopLoading());
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
}