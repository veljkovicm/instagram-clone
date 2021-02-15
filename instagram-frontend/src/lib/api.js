import axios from 'axios';

const apiCall = async ({ method, path, headers = {}, body, params }) => {
  try {

    // const baseURL = CONFIG.api.url;

    const url = path;
    const token = localStorage.getItem('token');

    const response = await axios({
      baseURL: process.env.REACT_APP_API_URL,
      url,
      params,
      method,
      // withCredentials: true, enable in production?
      headers: {
        'content-type': 'application/json',
        'x-auth-token': token,
        ...headers,
      },
      data: body,
    });
    const { status, data } = response;
    
    return { data, status };
  } catch (error) {
    console.warn(error);
    if (!error.response) {
      return {
        data: {
          message: 'Service Unavailable',
          statusCode: 503,
        },
        status: 503,
      };
    }

    const { response } = error;
    const { status, data } = response;

    return { data, status };
  }
};


export default apiCall;
