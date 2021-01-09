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
      <div className="user-post feed-post">
        <PostHeader avatar={post.avatar} username={post.username} />
        <div className="user-post__image-wrapper">
          <img src={`http://localhost:5000/uploads/${post.fileName}`} />
        </div>
        <div className="user-post__details">
          <PostControls
            likeAction={likeAction}
            savePostAction={savePostAction}
            post={post}
          />
          <PostComments postComment={postComment} post={post} />
        </div>
      </div>
    )
  } else {
    postMarkup = (
      <div className="user-post single-post">
        <div className="user-post__image-wrapper">
          <img src={`http://localhost:5000/uploads/${post.fileName}`} />
        </div>
        <div className="user-post__details">
          <PostHeader avatar={post.avatar ? post.avatar : post.user?.avatar} username={post.username || post.user?.username} />
          <PostComments
            postComment={postComment}
            post={post}
            type={type}
          />
          <PostControls
            likeAction={likeAction}
            savePostAction={savePostAction}
            post={post}
          />
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
