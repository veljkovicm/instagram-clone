import { API } from 'lib';

export const search = ({ query }) => async () => {
  const body = {
    query,
  };

  const response = await API({ method: 'POST', path: '/search', body });

  if(response.data.statusCode === 200) {
    return response.data.result;
  } else if (response.data.statusCode === 401) {
    console.log('NOT ALLOWED!')
  } else {
    console.log(response.message);
  }
};
