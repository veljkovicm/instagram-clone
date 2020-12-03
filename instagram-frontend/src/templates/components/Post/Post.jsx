import React from 'react';
import PropTypes from 'prop-types';
import {
  PostComments,
  PostControls,
  PostHeader,
} from './components';
import './post.scss';

const Post = (props) => {
  const {
    postComment,
    likeAction,
    savePostAction,
    post,
    type,
  } = props;
  let postMarkup;

  if(type === 'feed') {
    postMarkup = (
      <div className="post feed-post">
        <PostHeader avatar={post.avatar} username={post.username} />
        <div className="single_post__image-wrapper">
          <img src={`http://localhost:5000/uploads/${post.fileName}`} alt="post-image" width="60%"/>
        </div>
        <PostControls likeAction={likeAction} savePostAction={savePostAction} post={post} />
        <PostComments postComment={postComment} post={post} />
      </div>
    )
  } else {
    postMarkup = (
      <div className="post single-post">
        <div className="single_post__image-wrapper">
          <img src={`http://localhost:5000/uploads/${post.fileName}`} alt="post-image" width="60%"/>
        </div>
        <div className="post__details">
          <PostHeader avatar={post.avatar} username={post.username} />
          <PostControls likeAction={likeAction} savePostAction={savePostAction} post={post} />
          <PostComments postComment={postComment} post={post} />
        </div>
      </div>
    )
  }

  return postMarkup;
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  type: PropTypes.string,
  postComment: PropTypes.func.isRequired,
  likeAction: PropTypes.func.isRequired,
  savePostAction: PropTypes.func.isRequired,
}


export default Post;
