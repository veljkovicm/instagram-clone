import { API } from 'lib';

export const upload = ({ formData }) => async () => {
  const headers = {
    'Content-Type': 'multipart/form-data'
  }

  const response = await API({ method: 'POST', path: '/p/upload', body: formData, headers });

  if(response.data.statusCode === 200) {
    return response.data.payload.newPost;
  } else {
    console.log(response.message);
  }
}

export const getPosts = () => async () => {
  const response = await API({ method: 'GET', path: '/p/posts'})

  if(response.data.statusCode === 200) {
    return response.data;
  } else {
    console.log(response.message);
  }
}

