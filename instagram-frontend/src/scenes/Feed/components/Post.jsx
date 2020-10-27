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
  } = props;
  const [ comment, setComment ] = useState('');
  const [ liked, setLiked ] = useState(isLiked);
  const history = useHistory();

  const uploadTime = formatDistance(new Date(uploadedAt).getTime(), new Date());
  let commentInput = null;
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    postComment({ id, comment });
  }

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const handleCommentIconClick = () => {
    history.push(`/p/${id}`)
  }
  const commentsMarkup = (
    comments.map((comment) => {
      return <div>
        <span><Link to={`/u/${comment.user.username}`}>{comment.user.username}</Link></span>
        <span>{comment.comment}</span>
      </div>
    })
  )

  const handleLikeIconClick = () => {

    likeAction({ postId: id, liked }).then(() => {
      setLiked(!liked);
    })
  }
  
  const imageSrc = avatar ? `http://localhost:5000/uploads/${avatar}` : 'http://localhost:5000/uploads/no-img.png';
  return (
    <div className="single-post">
      <div className="single-post__user-badge">
        <Link to={`/u/${username}`}>
          <img src={imageSrc} alt="userAvatar" width="30"/>
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
        <div>Save</div>
      </div>
      {/* likes */}
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