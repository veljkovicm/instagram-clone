import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { formatDistance} from 'date-fns';

const Post = (props) => {
  const [ comment, setComment ] = useState('');
  const history = useHistory();

  const {
    id,
    caption,
    fileName,
    avatar,
    uploadedAt,
    username,
    postComment,
    comments,
  } = props;

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
        <span><Link to={`/${comment.user.username}`}>{comment.user.username}</Link></span>
        <span>{comment.comment}</span>
      </div>
    })
  )
  
  const imageSrc = avatar ? `https://localhost:5000/public/uploads/${avatar}` : 'http://localhost:5000/uploads/no-img.png';
  return (
    <div className="single-post">
      <div className="single-post__user-badge">
        <Link to={`/${username}`}>
          <img src={imageSrc} alt="userAvatar" width="30"/>
        {username}
        </Link>
        {/* dot menu */}
      </div>
      <div className="single_post__image-wrapper">
        <img src={`http://localhost:5000/uploads/${fileName}`} alt="post-image" width="60%"/>
      </div>
      <div className="single-post__actions-wrapper" style={{ display: 'flex' }}>
        <div>Like</div>
        <div onClick={handleCommentIconClick}>Comment</div> 
        <div>Direct</div>
        <div>Save</div>
      </div>
      {/* likes */}
      <div className="single-post__caption-wrapper">
        <Link to={`/${username}`}>{username}</Link>
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