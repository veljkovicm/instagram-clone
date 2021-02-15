import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { UserListPopup } from 'components';

import './userHeader.scss';

const UserHeader = (props) => {
  const {
    user,
    username,
    uploadAvatar,
    followUser,
    unfollowUser,
    getFollowList,
    postCount,
    myUsername,
  } = props;

  const avatarSrc = user.avatar ? `${process.env.REACT_APP_ENV_spacesURL}/avatars/${user.avatar}` : `${process.env.REACT_APP_ENV_spacesURL}/assets/no-img.png`;
  const [ following, setFollowing ] = useState(user.following);
  const [ popup, setPopup ] = useState();
  const [ popupData, setPopupData ] = useState({});
  const [ avatar, setAvatar ] = useState(avatarSrc);
  const [ followingCount, setFollowingCount ] = useState(user.followingCount);


  const history = useHistory();
  let avatarInput = null;

  const handleAvatarIconClick = () => {
    avatarInput.click();
  }

  const handleFollowButtonClick = (username) => {
    if(following) {
      unfollowUser(username).then(() => {
        user.followerCount--;
        setFollowing(!following);
      });
    } else {
      followUser(username).then(() => {
        user.followerCount++
        setFollowing(!following)
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    uploadAvatar({ formData }).then((res) => {
      setTimeout(() => { 
        setAvatar(res?.newAvatar);
        // TODO add loading spinner while loading image
      }, 500);
    });
  }

  const handleEditButtonClick = () => {
    history.push('/settings');
  }

  const handlePopupLinkClick = (listType) => {
    getFollowList({ listType, username }).then((res) => {
      setPopupData(res);
      setPopup(listType);
    });
  }


  return (
    <div className="profile-header">
      {
        popup 
          &&
        <UserListPopup
          type={popup}
          data={popupData}
          setPopup={setPopup}
          setPopupData={setPopupData}
          unfollowUser={unfollowUser}
          followUser={followUser}
          myUsername={myUsername}
          setFollowingCount={setFollowingCount}
        />
      }
      <div
        className="profile-header__avatar"
        onClick={user.isOwnProfile ? handleAvatarIconClick : null}
        style={{ backgroundImage: `url(${avatar})`}}
      >
        <div className={user.isOwnProfile ? 'profile-header__avatar__hover' : ''} />
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            hidden
            accept="image/png, image/jpeg"
            name="avatar-upload"
            ref={(input) => { avatarInput = input; }}
            onChange={handleSubmit}
          />
        </form>
      </div>
        <div className="profile-header__info">
          <div className="profile-header__info__top">
            <h2 className="profile-header__info__username">{username}</h2>
            {
              !user.isOwnProfile ?
              <button
                className={`profile-header__info__follow-button ${following ? 'btn-white' : 'btn-blue'}`}
                onClick={() => handleFollowButtonClick(username)}
              >
                {following ? 'Following' : 'Follow'}
              </button>
              :
              <button className="profile-header__info__edit-button" onClick={handleEditButtonClick}>Edit profile</button>
            }
          </div>
          <div className="profile-header__info__user-stats">
            <span className="profile-header__info__user-stats__posts"><b>{postCount}</b> posts</span>
            <span className="profile-header__info__user-stats__followers" onClick={() => handlePopupLinkClick('follower')}><b>{user.followerCount}</b> followers</span>
            <span className="profile-header__info__user-stats__following" onClick={() => handlePopupLinkClick('followed')}><b>{followingCount}</b> following</span>
          </div>
          <div className="profile-header__bio">
            <h1 className="profile-header__bio__name">{user.fullName}</h1>
            <p className="profile-header__bio__text">{user.bio}</p>
            <a target="_blank" href={`https://${user.website}`} className="profile-header__website-link">{user.website}</a>
          </div>
        </div>
    </div>
  )
}

UserHeader.propTypes = {
  user: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  getFollowList: PropTypes.func.isRequired,
  postCount: PropTypes.number.isRequired,
  myUsername: PropTypes.string,
}

export default UserHeader;
