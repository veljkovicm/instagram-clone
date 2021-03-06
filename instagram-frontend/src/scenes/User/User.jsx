import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import UserHeader from './components/UserHeader/UserHeader.jsx';
import UserPosts from './components/UserPosts/UserPosts.jsx';
import {
  Header,
  Loading,
} from 'components';

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
  }, [
    username,
    getUser,
    history
  ]);

  if(!dataLoaded) {
    return <Loading />
  }

  return (
    <>
      <Header path={`/u/${username}`}/>
      <Helmet><title>{`Profile - ${username}`}</title></Helmet>
      <div className="user-profile-wrapper page-content">
        <UserHeader
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
          username={username}
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
