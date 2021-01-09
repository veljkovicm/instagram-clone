import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';


const PostControls = (props) => {
  const {
    post,
    savePostAction,
    likeAction,
  } = props;

  const {
    id,
    isLiked,
    isSaved,
    likeCount,
  } = post;

  const history = useHistory();

  const [ liked, setLiked ] = useState(isLiked || false);
  const [ saved, setSaved ] = useState(isSaved || false);
  const [ likeCounter, setLikeCounter ] = useState(likeCount || 0);

  const handleCommentIconClick = () => {
    history.push(`/p/${id}`);
  };

  const handleLikeIconClick = () => {
    setLiked(!liked);
    setLikeCounter(liked ? likeCounter - 1 : likeCounter + 1);
    likeAction({ postId: id, liked });
  };

  const handleSavePostClick = () => {
    setSaved(!saved);
    savePostAction(id);
  };

  return (
    <div className="user-post__actions-wrapper">
      <div className="user-post__actions-inner">
        <div className={`user-post__actions__single like ${liked ? 'liked' : ''}`} onClick={handleLikeIconClick} />
        <div className="user-post__actions__single comment" onClick={handleCommentIconClick} /> 
        <div className="user-post__actions__single direct forbidden" />
        <div  className={`user-post__actions__single save ${saved ? 'saved' : ''}`} onClick={handleSavePostClick} />
      </div>
      <div className="user-post__like-counter">
        {likeCounter > 0 ? <span>{likeCounter} {likeCounter === 1 ? 'like' : 'likes'}</span> : null}
      </div>
    </div>
  )
}

PostControls.propTypes = {
  post: PropTypes.object.isRequired,
  savePostAction: PropTypes.func.isRequired,
  likeAction: PropTypes.func.isRequired,
}


export default PostControls;
