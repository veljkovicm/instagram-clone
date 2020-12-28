import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './components/Sidebar.jsx';
import {
  Header,
  Post,
  Loading,
} from 'components';

import './feed.scss';

const Feed = ({ getPosts, user}) => {
  const [ posts, setPosts ] = useState();

  useEffect(() => {
    getPosts().then((res) =>{
      setPosts(res.posts);
    })
  }, [ getPosts ]);


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
