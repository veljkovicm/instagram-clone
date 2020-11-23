import { API } from 'lib';
import { startLoading, stopLoading } from 'templates/components/Loading/actions';

export const updateSettings = (userData) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());

    const body = userData;
    console.log('>> body', body);

    const response = await API({ method: 'POST', path: '/u/update-settings', body });

    if(response.data.statusCode === 200) {
      console.log('SUCCESS');
    } else if (response.data.statusCode === 401) {
      // dispatch notification here
      console.log('NOT ALLOWED!')
    } else {
      // dispatch notification here
      console.log(response)
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