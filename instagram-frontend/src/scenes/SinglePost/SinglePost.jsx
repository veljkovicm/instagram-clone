import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

SinglePost.propTypes = {
  postComment: PropTypes.func.isRequired,
  postData: PropTypes.func,
  getPost: PropTypes.func.isRequired,
  likeAction: PropTypes.func.isRequired,
}

export default SinglePost;
