import { API } from 'lib';

export const getUser = ({ username }) => async () => {
  const response = await API({ method: 'GET', path: `/u/${username}` });

  if(response.data.statusCode === 200) {
    return response.data.payload;
  } else if (response.data.statusCode === 401) {
    console.log('NOT ALLOWED!')
  } else {
    console.log(response.message);
  }
}

export const uploadAvatar = ({ formData }) => async () => {
  const headers = {
    'Content-Type': 'multipart/form-data'
  }

  const response = await API({ method: 'POST', path: '/u/upload-avatar', body: formData, headers });

  if(response.data.statusCode === 200) {
    return response.data.payload;
  } else if (response.data.statusCode === 401) {
    console.log('NOT ALLOWED!')
  } else {
    console.log(response.message);
  }
}


export const followUser = (username) => async () => {
  const body = {
    username,
  }

  const response = await API({ method: 'POST', path:'/u/follow', body });

  if(response.data.statusCode !== 200) {
    console.log(response.message);
  }
}

export const unfollowUser = (username) => async () => {
  const body = {
    username,
  }

  const response = await API({ method: 'POST', path:'/u/unfollow', body });

  if(response.data.statusCode !== 200) {
    console.log(response.message);
  }
}

export const getFollowList = ({ listType, username }) => async () => {
  const body = { username };
  const path = listType === 'follower' ? '/u/get-follower-list' : 'u/get-following-list';

  const response = await API({ method: 'POST', path, body });
  
  if(response.data.statusCode === 200) {
    return response.data.payload;
  } else if (response.data.statusCode === 401) {
    console.log('NOT ALLOWED!')
  } else {
    console.log(response.message);
  }
}