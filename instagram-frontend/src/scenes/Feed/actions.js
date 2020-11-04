import { API } from '../../lib'
import { startLoading, stopLoading } from '../../templates/components/Loading/actions';

export const upload = ({ formData }) => async (dispatch, getState) => {

  try {
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    const response = await API({ method: 'POST', path: '/p/upload', body: formData, headers });

    if(response.data.statusCode === 200) {
      console.log('SUCCESS');
      return response.data.payload.newPost;
    } else if (response.data.statusCode === 401) {
      // dispatch notification here
      console.log('NOT ALLOWED!')
    } else {
      // dispatch notification here
      console.log('Something went wrong')
    }
  } catch (error) {
    // dispatch error message
    console.log(error);
  }
}

export const getPosts = () => async(dispatch, getState) => {
  try {
    // dispatch(startLoading());

    const response = await API({ method: 'GET', path: '/p/posts'})


    if(response.data.statusCode === 200) {
      console.log('SUCCESS');
      return response.data;
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

