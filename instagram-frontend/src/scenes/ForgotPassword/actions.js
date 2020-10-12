import { API } from '../../lib'
import { startLoading, stopLoading } from '../../templates/components/Loading/actions';

export const forgotPassword = ({ email }) => async (dispatch, getState) => {
  const  { isLoading } = getState().auth;
  const lowercaseEmail = email.toLowerCase();

  if (isLoading) return;

  try {
    dispatch(startLoading());

    const body = {
      email: lowercaseEmail,
    }
    // export all routes to constants file?
    await API({ method: 'POST', path: '/password/forgot_password', body }).then(response => {
      return response;
    });


    // move response to const

    // if status 200 set user
    // if else 401 dispatch notification
    // else throw error, display message from error


  } catch (error) {
    // dispatch error message
    dispatch(stopLoading());
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
}