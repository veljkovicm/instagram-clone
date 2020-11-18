import { API } from 'lib';
import { setUser } from 'core/user';
import { startLoading, stopLoading } from 'templates/components/Loading/actions';

export const login = ({ username, password, rememberMe }) => async (dispatch, getState) => {
  const  { isLoading } = getState().auth;
  const lowercaseUsername = username.toLowerCase();

  if (isLoading) return;

  try {
    dispatch(startLoading());

    const body = {
      username: lowercaseUsername,
      password,
      rememberMe,
    }

    const response = await API({ method: 'POST', path: '/user/sign_in', body });

    if(response.data.statusCode === 200) {
      dispatch(setUser(response.data.payload));
    } else if (response.data.statusCode === 401) {
      // dispatch notification here
      console.log('NOT ALLOWED!')
    } else {
      // dispatch notification here
      console.log('Something went wrong')
    }


  } catch (error) {
    // dispatch error message
    dispatch(stopLoading());
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
}