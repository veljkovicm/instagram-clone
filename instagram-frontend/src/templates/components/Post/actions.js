import { API } from 'lib';

export const postComment = ({ comment, id }) => async () => {
  const body = {
    comment,
    postId: id,
  }

  const response = await API({ method: 'POST', path: '/p/comment', body });

  if(response.data.statusCode === 200) {
    return response.data;
  } else if (response.data.statusCode === 401) {
    console.log('NOT ALLOWED!')
  } else {
    // dispatch notification here
    console.log(response.message);
  }
}

export const likeAction = ({ postId, liked }) => async () => {
  const body = { postId, liked };

  const response = await API({ method: 'POST', path: '/p/like-action', body});

  if(response.data.statusCode === 200) {
    return response;
  } else if (response.data.statusCode === 401) {
    console.log('NOT ALLOWED!');
  } else {
    console.log(response.message);
  }
}

export const savePostAction = ({ postId, saved }) => async () => {
  const body = { postId, saved };

  const response = await API({ method: 'POST', path: '/p/save-post-action', body });

  if(response.data.statusCode === 200) {
    return response;
  } else if (response.data.statusCode === 401) {
    console.log('NOT ALLOWED!');
  } else {
    console.log(response.message);
  }
}