import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';

{/* deleting a comment is only possible in single post popup */}

const Comments = (props) => {
  const { post, postComment } = props;
  const {
    id,
    username,
    caption,
    uploadedAt,
    comments,
    avatar,
  } = post;

  const [ comment, setComment ] = useState('');
  const [ postComments, setPostComments ] = useState(comments || []);


  let commentInput = null;
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

  const commentsMarkup = (
    postComments.map((comment, i) => {
      return <div key={i}>
        <span><Link to={`/u/${comment.user.username}`}>{comment.user.username}</Link></span>
        <span>{comment.comment}</span>
      </div>
    })
  );

  return (
    <div>
      <div className="single-post__caption-wrapper">
        <Link to={`/u/${username}`}>{username}</Link>
        <span>{caption}</span>
      </div>
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
    </div>
  )
}

Comments.propTypes = {
  post: PropTypes.object.isRequired,
  postComment: PropTypes.func.isRequired,
}

export default Comments;