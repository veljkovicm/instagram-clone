import { API } from '../../../../../lib';
import { startLoading, stopLoading } from '../../../../../templates/components/Loading/actions';

export const search = ({ query }) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());

    const body = {
      query: query,
    }
    console.log('>> body', body);
    const response = await API({ method: 'POST', path: '/search', body });

    if(response.data.statusCode === 200) {
      return response.data.result;
      
      console.log('>> response', response);
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