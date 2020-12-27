import { API } from 'lib';

export const updateSettings = (userData) => async () => {
    const body = userData;
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
}