import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UploadPopup } from 'components';

const FeedSidebar = ({ user, setPosts }) => {
  const {
    username,
    fullName,
    avatar,
  } = user;

  const [ showPopup, setShowPopup ] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(!showPopup);
  }

  const avatarSrc = avatar ? `${process.env.REACT_APP_ENV_spacesURL}/avatars/${avatar}` : `${process.env.REACT_APP_ENV_spacesURL}/assets/no-img.png`;

  return (
    <>
      { showPopup && <UploadPopup setPosts={setPosts} setShowPopup={setShowPopup} /> }
      <div className="sidebar">
        <div className="sidebar__user">
          <div className="sidebar__user__avatar">
            <Link to={`/u/${username}`}>
              <img src={avatarSrc} alt="avatar" />
            </Link>
          </div>
          <div className="sidebar__user__info">
            <div className="sidebar__user__info__username">
              <Link to={`/u/${username}`}>{username}</Link>
            </div>
            <div className="sidebar__user__info__name">{fullName}</div>
          </div>
        </div>
        <button className="sidebar__upload-button" onClick={handleButtonClick}>Upload</button>
      </div>
    </>
  )
}

FeedSidebar.propTypes = {
  user: PropTypes.object.isRequired,
  setPosts: PropTypes.func.isRequired,
}


export default FeedSidebar;
