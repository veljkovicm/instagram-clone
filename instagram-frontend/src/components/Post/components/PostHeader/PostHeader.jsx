import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostHeader = ({ avatar, username }) => {
  const avatarSrc = avatar ? `http://localhost:5000/uploads/${avatar}` : 'http://localhost:5000/uploads/no-img.png';

  return (
    <div className="user-post__header">
        <div className="user-post__header__avatar">
          <Link to={`/u/${username}`}>
            <img src={avatarSrc} alt="userAvatar"/>
          </Link>
          </div>
        <div className="user-post__header__username">
          <Link to={`/u/${username}`}>
            {username}
          </Link>
        </div>
    </div>
  )
}

PostHeader.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
}

export default PostHeader;
