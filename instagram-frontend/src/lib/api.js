import axios from 'axios';

const apiUrlPrefix = '/api/1.0';

const apiCall = async ({ method, path, headers = {}, body, params, disableAPIPrefix = true }) => { // !!!!! WAS FALSE
  try {

    // const baseURL = CONFIG.api.url;
    const urlPrefix = disableAPIPrefix ? '' : apiUrlPrefix;

    // const url = PATH.join(urlPrefix, path);
    const url = path;
    const token = localStorage.getItem('token');


    const response = await axios({
      baseURL: 'http://localhost:5000/',
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
