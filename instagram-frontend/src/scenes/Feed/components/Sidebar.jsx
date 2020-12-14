import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UploadPopup } from 'templates/components/Popups';

const FeedSidebar = (props) => {
  const {
    user,
    setPosts,
  } = props;

  const {
    username,
    fullName,
    avatar,
  } = user;

  const [ showPopup, setShowPopup ] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(!showPopup);
  }

  const avatarSrc = avatar ? `http://localhost:5000/uploads/${avatar}` : 'http://localhost:5000/uploads/no-img.png';

  
  return (
    <div className="sidebar">
      { showPopup && <UploadPopup setPosts={setPosts} setShowPopup={setShowPopup} /> }
      <div className="sidebar__user">
        <div className="sidebar__user__avatar">
          <Link to={`/u/${username}`}>
            <img src={avatarSrc} />
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
  )
}

export default FeedSidebar;
