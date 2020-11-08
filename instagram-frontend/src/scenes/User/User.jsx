import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../../templates/components/Header/index.js';
import UserHeader from './components/UserHeader/UserHeader.jsx';
import UserPosts from './components/UserPosts/UserPosts.jsx';
import { Helmet } from 'react-helmet';

import './user.css';

const Feed = (props) => {
  const {
    getUser,
    uploadAvatar,
    followUser,
    unfollowUser,
    getFollowList,
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
  console.log('>> POSTS', posts);
  return (
    <div className="user-profile-wrapper">
      <Header path={`/u/${username}`}/>
      <Helmet>
        <title>{`Profile - ${username}`}</title>
      </Helmet>
      <UserHeader
        user={user}
        uploadAvatar={uploadAvatar}
        followUser={followUser}
        unfollowUser={unfollowUser}
        getFollowList={getFollowList}
        username={username}
        postCount={posts.userPosts.length}
      />
      <UserPosts 
        posts={posts}
        isOwnProfile={user.isOwnProfile}
      />
    </div>
  )
};

// PropTypes

export default Feed;





