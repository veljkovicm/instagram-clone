import React, { useState, useEffect } from 'react';
import Header from '../../templates/components/Header/index.js';
import Post from '../../templates/components/Post';

import './feed.css';

const Feed = (props) => {
  const {
    upload,
    getPosts,
    postComment,
    likeAction,
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
    posts.map((post, i) => {
      return <div key={i}>
        <Post postComment={postComment} {...post} likeAction={likeAction} />
        </div>
    }) : <div>LOADING</div>
    // loading component
  )


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', caption);
    console.log(formData);
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
      <form onSubmit={handleSubmit}>
        <input type="file" name="myImage" onChange={handleChange}/>
        <input type="text" name="description" onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>upload</button>
      </form>
      {markup}
    </div>
  )
};

// PropTypes

export default Feed;





