import { API } from 'lib';

export const getPost = ({ postId }) => async () => {
  const response = await API({ method: 'GET', path: `/p/get-post/${postId}` });
  
  if(response.data.statusCode === 200) {
    return response.data.post;
  } else if (response.data.statusCode === 401) {
    console.log('NOT ALLOWED!')
  } else {
    console.log(response.message);
  }
};