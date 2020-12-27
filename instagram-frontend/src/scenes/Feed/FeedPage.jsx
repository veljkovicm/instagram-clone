import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from 'templates/components/Header/';
import Post from 'templates/components/Post';
import Sidebar from './components/Sidebar.jsx';
import Loading from 'templates/components/Loading/Loading.jsx';

import './feed.scss';

const Feed = (props) => {
  const {
    getPosts,
    user,
  } = props;

  const [ posts, setPosts ] = useState();

  useEffect(() => {
    getPosts({ userId: 'test'}).then((res) =>{
      setPosts(res.posts);
    })
  }, [])


  if(!posts) {
    return <Loading />
  }

  const markup = 
    posts.map((post) => {
      return <Post
        post={post}
        type="feed"
        key={post.id}
      />
    });
  
  return (
    <div className="feed">
      <Header path="/feed" />
      <div className="feed__posts-wrapper page-content">
        <div className="feed__posts">{markup}</div>
        <Sidebar user={user} setPosts={setPosts} />
      </div>
    </div>
  )
};

Feed.propTypes = {
  upload: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
}

export default Feed;
