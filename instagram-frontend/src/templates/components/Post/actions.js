import { API } from '../../../lib';

export const postComment = ({ comment, id }) => async(dispatch, getState) => {
  try {
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