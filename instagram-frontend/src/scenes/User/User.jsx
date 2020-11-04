import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../../templates/components/Header/index.js';
import UserHeader from './components/UserHeader.jsx';

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

  const postsMarkup = (
    posts.map((post) =>
      <div key={post.id} className="user-profile__posts__single">
        <img src={`http://localhost:5000/uploads/${post.fileName}`} alt="user-post" />
        <div className="user-profile__posts__single__hover">
          <div>L: {post.likeCount ? post.likeCount : 0}</div>
          <div>C: {post.commentCount ? post.commentCount : 0}</div>
        </div>
      </div>
    )
  )

  if(!dataLoaded) {
    return <p>LOADING</p>
  }

  return (
    <div className="user-profile-wrapper">
      <Header path={`/u/${username}`}/>
      <UserHeader
        user={user}
        uploadAvatar={uploadAvatar}
        followUser={followUser}
        unfollowUser={unfollowUser}
        getFollowList={getFollowList}
        username={username}
        postCount={posts.length}
      />
      <div className="user-profile__posts">
        {postsMarkup}
      </div>
    </div>
  )
};

// PropTypes

export default Feed;





