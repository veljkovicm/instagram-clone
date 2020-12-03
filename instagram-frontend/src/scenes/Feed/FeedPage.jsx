import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from 'templates/components/Header/';
import Post from 'templates/components/Post';

import './feed.css';

const Feed = (props) => {
  const {
    upload,
    getPosts,
  } = props;
  const [ file, setFile ] = useState();
  const [ caption, setCaption ] = useState('');

  const [ posts, setPosts ] = useState();

  useEffect(() => {
    getPosts({ userId: 'test'}).then((res) =>{
      setPosts(res.posts);
    })
  }, [])

  const handleChange =  (e) => {
    if(e.target.files) {
      setFile(e.target.files[0]);
    } else {
      setCaption(e.target.value);
    }
  }

  const markup = (
    posts ? 
    posts.map((post) => {
      return <div key={post.id}>
        <Post post={post} type="feed" />
        </div>
    }) : <div>LOADING</div>
    // loading component
  )


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', caption);
    upload({ formData }).then((res) => {
      setPosts((oldPosts) => [
        res,
        ...oldPosts,
      ]);
    });

  }
  return (
  <div className="feed">
      <Header path="/feed" />
      <div className="page-content">
        <form onSubmit={handleSubmit}>
          <input type="file" name="myImage" onChange={handleChange}/>
          <input type="text" name="description" onChange={handleChange} />
          <button type="submit" onClick={handleSubmit}>upload</button>
        </form>
        {markup}
      </div>
    </div>
  )
};

Feed.propTypes = {
  upload: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
}

export default Feed;
