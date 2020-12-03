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
  }

  const handleLikeIconClick = () => {
    setLiked(!liked);
    setLikeCounter(liked ? likeCounter - 1 : likeCounter + 1);
    likeAction({ postId: id, liked });
  }

  const handleSavePostClick = () => {
    setSaved(!saved);
    savePostAction({ postId: id, saved });
  }

  return (
    <>
      <div className="single-post__actions-wrapper" style={{ display: 'flex' }}>
        <div onClick={handleLikeIconClick}>{liked ? 'Unlike' : 'Like'}</div>
        <div onClick={handleCommentIconClick}>Comment</div> 
        <div>Direct</div>
        <div onClick={handleSavePostClick}>{saved ? 'SAVED' : 'Save'}</div>
      </div>
      <div className="single-post__like-counter">
        {likeCounter > 0 ? <p>{likeCounter} {likeCounter === 1 ? 'like' : 'likes'}</p> : null}
      </div>
    </>
  )
}

PostControls.propTypes = {
  post: PropTypes.object.isRequired,
  savePostAction: PropTypes.func.isRequired,
  likeAction: PropTypes.func.isRequired,
}


export default PostControls;