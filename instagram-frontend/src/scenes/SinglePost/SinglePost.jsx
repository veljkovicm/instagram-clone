import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../../templates/components/Post';
import Header from '../../templates/components/Header/index.js';


import './singlePost.css';

const SinglePost = (props) => {
  const {
    // post,
    postComment,
    postData,
    getPost,
    likeAction,
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
      { post ? <Post postComment={postComment} likeAction={likeAction} {...post}/> : <p>LOADING</p>}
    </div>
  )
};

// PropTypes

export default SinglePost;





