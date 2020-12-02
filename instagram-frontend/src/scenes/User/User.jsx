import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from 'templates/components/Header';
import UserHeader from './components/UserHeader/UserHeader.jsx';
import UserPosts from './components/UserPosts/UserPosts.jsx';

import './user.css';

const User = (props) => {
  const {
    getUser,
    uploadAvatar,
    followUser,
    unfollowUser,
    getFollowList,
    myUsername,
  } = props;

  const { username } = useParams();
  const history = useHistory();

  const [ user, setUser ] = useState({});
  const [ posts, setPosts ] = useState([]);
  const [ dataLoaded, setDataLoaded ] = useState(false);

  useEffect(() => {
    getUser({ username })
    .then((res) => {
      setUser(res.user);
      setPosts(res.posts);
    })
    .then(() => {
      setDataLoaded(true);
    })
    .catch((err) => {
      console.log(err);
      history.push('/feed');
    });
  }, [ username ]);

  if(!dataLoaded) {
    return <p>LOADING</p>
  }
  return (
    <>
      <Header path={`/u/${username}`}/>
      <Helmet><title>{`Profile - ${username}`}</title></Helmet>
      <div className="user-profile-wrapper">
        <UserHeader
          // TODO move first 5 actions to userHeader folder, connect with redux
          uploadAvatar={uploadAvatar}
          followUser={followUser}
          unfollowUser={unfollowUser}
          getFollowList={getFollowList}
          myUsername={myUsername}
          user={user}
          username={username}
          postCount={posts.userPosts.length}
        />
        <UserPosts 
          posts={posts}
          isOwnProfile={user.isOwnProfile}
        />
      </div>
    </>
  )
};

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  getFollowList: PropTypes.func.isRequired,
}

export default User;
