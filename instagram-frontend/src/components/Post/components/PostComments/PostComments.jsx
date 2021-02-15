import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
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
    caption,
    uploadedAt,
    comments,
  } = post;

  const [ comment, setComment ] = useState('');
  const [ postComments, setPostComments ] = useState(comments || []);

  let avatar, username;
  avatar = post.user ? post.user.avatar : post.avatar;
  username = post.user ? post.user.username : post.username;
  const uploadTime = formatDistance(new Date(uploadedAt).getTime(), new Date());
  const userAvatarSrc = avatar ? `${process.env.REACT_APP_ENV_spacesURL}/avatars/${avatar}` : `${process.env.REACT_APP_ENV_spacesURL}/assets/no-img.png`;


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
      let avatarSrc;
      // TODO refactor, no urls
      if(comment.avatar) {
        avatarSrc = `${process.env.REACT_APP_ENV_spacesURL}/avatars/${avatar}`;
      } else if (comment.user) {
        avatarSrc = `${process.env.REACT_APP_ENV_spacesURL}/avatars/${comment.user.avatar}`;
      } else {
        avatarSrc = `${process.env.REACT_APP_ENV_spacesURL}/assets/no-img.png`;
      }
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
            <span className="user-post__comments__single__username"><a href={`/u/${comment.user.username}`}>{comment.user.username}</a></span>
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
                <a href={`/u/${username}`}>
                  <img
                    src={userAvatarSrc}
                    alt="user-avatar"
                    width="32"
                  />
                </a>
              </div>
            }
            <div className="user-post__caption__content">
              <a href={`/u/${username}`} className="user-post__caption__username">{username}</a>
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