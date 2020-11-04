import { API } from '../../lib'
import { startLoading, stopLoading } from '../../templates/components/Loading/actions';

export const upload = ({ formData }) => async (dispatch, getState) => {
  const  { isLoading } = getState().auth;

  if (isLoading) return;

  try {
    dispatch(startLoading());

    console.log('formData', formData);

    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    const response = await API({ method: 'POST', path: '/p/upload', body: formData, headers });

    if(response.data.statusCode === 200) {
      console.log('SUCCESS');
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

export const postComment = ({ comment, id }) => async(dispatch, getState) => {
  try {
    // dispatch(startLoading());

    const body = {
      comment,
      postId: id,
    }
    console.log('body', body);
    const response = await API({ method: 'POST', path: '/p/comment', body });

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

  } catch(err) {
    console.error(err);
    // dispatch error notification
  } finally {
    // dispatch(stopLoading());
  }
}

export const likeAction = ({ postId, liked }) => async (dispatch,getState) => {
  const body = { postId, liked };

  const response = await API({ method: 'POST', path: '/p/like-action', body});

  if(response.data.statusCode === 200) {
    console.log('SUCCESS');
    console.log('>> response', response);
    return response;
  } else if (response.data.statusCode === 401) {
    // dispatch notification here
    console.log('NOT ALLOWED!');
  } else {
    // dispatch notification here
    console.log('Something went wrong')
    console.log('>> response', response);
  }
}