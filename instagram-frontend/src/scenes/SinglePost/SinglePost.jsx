import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../Feed/components/Post.jsx';
import Header from '../../templates/components/Header/index.js';


import './singlePost.css';

const Feed = (props) => {
  const {
    // post,
    postComment,
    postData,
    getPost,
  } = props;
  const { postId } = useParams();

  const [ post, setPost ] = useState(null);
  
  useEffect(() => {
    getPost({ postId }).then((res) => {
      setPost(res);
    });
  }, [])


  return (
    <div className="single-post-wrapper">
      <Header />
      { post ? <Post postComment={postComment}  {...post}/> : <p>LOADING</p>}
    </div>
  )
};

// PropTypes

export default Feed;





