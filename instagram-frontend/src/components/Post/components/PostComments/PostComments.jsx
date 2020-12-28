import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import { formatDateShort } from 'lib';

{/* deleting a comment is only possible in single post popup */}

const Comments = (props) => {
  const {
    post,
    postComment,
    type,
  } = props;

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


  const uploadTime = formatDistance(new Date(uploadedAt).getTime(), new Date());
  const avatarSrc = (avatar || post.user.avatar) ? `http://localhost:5000/uploads/${avatar || post.user.avatar}` : 'http://localhost:5000/uploads/no-img.png';


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
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const commentsMarkup = (
    postComments.map((comment) => {
      const commentedAt = formatDateShort(comment.createdAt);
      return <div className="user-post__comments__single" key={comment.id}>
        <div style={{ display: 'flex'}}>
          { type === 'single'
              &&
            <div className="user-post__comments__single__avatar">
              <img
                src={avatarSrc}
                alt="user-avatar"
                width="32"
              />
            </div>
          }
          <div className="user-post__comments__single__content" >
            <span className="user-post__comments__single__username"><Link to={`/u/${comment.user.username}`}>{comment.user.username}</Link></span>
            <span className="user-post__comments__single__comment">{comment.comment}</span>
            { type === 'single' && <span className="user-post__comments__single__timestamp">{commentedAt}</span> }
          </div>
        </div>
      </div>
    })
  );

  return (
    <>
      <div className="user-post__comments">
        {
          caption
            &&
          <div className="user-post__caption__wrapper">
            { type === 'single'
              && 
              <div className="user-post__caption__avatar">
                <Link to={`/u/${username}`}>
                  <img
                    src={avatarSrc}
                    alt="user-avatar"
                    width="32"
                  />
                </Link>
              </div>
            }
            <div className="user-post__caption__content">
              <Link to={`/u/${username}`} className="user-post__caption__username">{username}</Link>
              <span className="user-post__caption">{caption}</span>
            </div>
          </div> 
        }
         {commentsMarkup}
         </div>
      <div className="user-post__upload-time">{`${uploadTime} ago`}</div>
      <form className="user-post__comment-form" onSubmit={handleCommentSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={comment}
          placeholder="Add a comment"
          className="user-post__comment-form__input"
        />
        <button
          onClick={handleCommentSubmit}
          className="user-post__comment-form__button"
          disabled={comment.length < 1}
        >
          Post
        </button>
      </form>
    </>
  )
}

Comments.propTypes = {
  post: PropTypes.object.isRequired,
  postComment: PropTypes.func.isRequired,
  type: PropTypes.string,
}

export default Comments;