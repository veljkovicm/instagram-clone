import React from 'react';
import PropTypes from 'prop-types';

const PostHeader = ({ avatar, username }) => {
  const avatarSrc = avatar ? `${process.env.REACT_APP_ENV_spacesURL}/avatars/${avatar}` : `${process.env.REACT_APP_ENV_spacesURL}/assets/no-img.png`;

  return (
    <div className="user-post__header">
        <div className="user-post__header__avatar">
          <a href={`/u/${username}`}>
            <img src={avatarSrc} alt="userAvatar"/>
          </a>
          </div>
        <div className="user-post__header__username">
          <a href={`/u/${username}`}>
            {username}
          </a>
        </div>
    </div>
  )
}

PostHeader.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
}

export default PostHeader;
