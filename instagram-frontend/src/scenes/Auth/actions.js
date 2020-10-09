import { API } from '../../lib'
import { setUser } from '../../core/user';
import { startLoading, stopLoading } from '../../templates/components/Loading/actions';

export const login = ({ email, password, rememberMe }) => async (dispatch, getState) => {
  const  { isLoading } = getState().auth;
  const lowercaseEmail = email.toLowerCase();

  if (isLoading) return;

  try {
    dispatch(startLoading());

    const body = {
      email: lowercaseEmail,
      password,
      rememberMe,
    }

    await API({ method: 'POST', path: '/user/sign_in', body }).then(response => {
      dispatch(setUser(response.data.payload.user));
      console.log('RESPONSE', response)
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