import { API } from 'lib';
import { startLoading, stopLoading } from 'templates/components/Loading/actions';
// check if these are needed ^^^

export const getUser = ({ username }) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());


    const response = await API({ method: 'GET', path: `/u/${username}` });
    console.log('response', response);
    if(response.data.statusCode === 200) {
      console.log('user response', response);
      return response.data.payload;
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

export const uploadAvatar = ({ formData }) => async (dispatch, getState) => {
  try {
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    const response = await API({ method: 'POST', path: '/u/upload-avatar', body: formData, headers });

    if(response.data.statusCode === 200) {
      console.log('SUCCESS');
      return response.data.payload;
    } else if (response.data.statusCode === 401) {
      // dispatch notification here
      console.log('NOT ALLOWED!')
    } else {
      // dispatch notification here
      console.log('Something went wrong')
    }
  } catch (error) {
    // dispatch error message
  }
}


export const followUser = (username) => async (dispatch, getState) => {
  const body = {
    username,
  }

  const response = await API({ method: 'POST', path:'/u/follow', body });

  if(response.data.statusCode === 200) {
    console.log('FOLLOWING');
  } else if (response.data.statusCode === 401) {
    // dispatch notification here
    console.log('NOT ALLOWED!')
  } else {
    // dispatch notification here
    console.log('Something went wrong');
  }
}

export const unfollowUser = (username) => async (dispatch, getState) => {
  const body = {
    username,
  }

  const response = await API({ method: 'POST', path:'/u/unfollow', body });

  if(response.data.statusCode === 200) {
    console.log('NOT FOLLOWING');
  } else if (response.data.statusCode === 401) {
    // dispatch notification here
    console.log('NOT ALLOWED!')
  } else {
    // dispatch notification here
    console.log('Something went wrong');
  }
}

export const getFollowList = ({ listType, username }) => async (dispatch, getState) => {

  const body = {
    listType,
    username,
  };

  const response = await API({ method: 'POST', path:'/u/get-list', body});
  
  if(response.data.statusCode === 200) {
    console.log('LIST FETCH SUCCESS');
    console.log(response);
    return response.data.payload;
  } else if (response.data.statusCode === 401) {
    // dispatch notification here
    console.log('NOT ALLOWED!')
  } else {
    // dispatch notification here
    console.log('Something went wrong');
  }
}