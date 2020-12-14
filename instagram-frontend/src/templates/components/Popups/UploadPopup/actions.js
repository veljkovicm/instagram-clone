import { API } from 'lib';


export const upload = async ({ formData }) => {
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
}