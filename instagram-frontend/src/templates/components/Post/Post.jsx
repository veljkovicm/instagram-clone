import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { formatDistance} from 'date-fns';

const Post = (props) => {
  const {
    id,
    caption,
    fileName,
    avatar,
    uploadedAt,
    username,
    postComment,
    comments,
    likeAction,
    isLiked,
    likeCount,
    isSaved,
    savePostAction,
  } = props;

  const [ comment, setComment ] = useState('');
  const [ postComments, setPostComments ] = useState(comments || []);
  const [ liked, setLiked ] = useState(isLiked);
  const [ saved, setSaved ] = useState(isSaved);
  const [ likeCounter, setLikeCounter ] = useState(likeCount);


  let commentInput = null
  const history = useHistory();
  const uploadTime = formatDistance(new Date(uploadedAt).getTime(), new Date());
  const avatarSrc = avatar ? `http://localhost:5000/uploads/${avatar}` : 'http://localhost:5000/uploads/no-img.png';

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    postComment({ id, comment })
    .then((res) => {
      setPostComments((prevState) => [
        ...prevState,
        res.payload,
      ]);
      setComment('');
    })
  }

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const handleCommentIconClick = () => {
    history.push(`/p/${id}`)
  }

  const commentsMarkup = (
    postComments.map((comment, i) => {
      return <div key={i}>
        <span><Link to={`/u/${comment.user.username}`}>{comment.user.username}</Link></span>
        <span>{comment.comment}</span>
      </div>
    })
  )
  const handleLikeIconClick = () => {
    setLiked(!liked);
    if(liked) {
      setLikeCounter(likeCounter - 1)
    } else {
      setLikeCounter(likeCounter + 1)
    }
    likeAction({ postId: id, liked });
  }

  const handleSavePostClick = () => {
    setSaved(!saved);
    savePostAction({ postId: id, saved });
  }

  return (
    <div className="single-post">
      <div className="single-post__user-badge">
        <Link to={`/u/${username}`}>
          <img src={avatarSrc} alt="userAvatar" width="30"/>
          {username}
        </Link>
        {/* dot menu */}
      </div>
      <div className="single_post__image-wrapper">
        <img src={`http://localhost:5000/uploads/${fileName}`} alt="post-image" width="60%"/>
      </div>
      <div className="single-post__actions-wrapper" style={{ display: 'flex' }}>
        <div onClick={handleLikeIconClick}>{liked ? 'Unlike' : 'Like'}</div>
        <div onClick={handleCommentIconClick}>Comment</div> 
        <div>Direct</div>
        <div onClick={handleSavePostClick}>{saved ? 'SAVED' : 'Save'}</div>
      </div>
      {likeCounter > 0 ? <p>{likeCounter} {likeCounter === 1 ? 'like' : 'likes'}</p> : null}
      <div className="single-post__caption-wrapper">
        <Link to={`/u/${username}`}>{username}</Link>
        <span>{caption}</span>
      </div>
      <hr/>
      {commentsMarkup}
      {`${uploadTime} ago`}
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={comment}
          placeholder="Add a comment"
          ref={(input) => { commentInput = input; }}
        />
        <button onClick={handleCommentSubmit}>Post</button>
      </form>
      {/* move comment to separate component */}
      {/* deleting a comment is only possible in single post popup */}
    </div>
  )
}


export default Post;