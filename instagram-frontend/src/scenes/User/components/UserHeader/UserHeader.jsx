import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserListPopup } from '../../../../templates/components/Popups';

import './userHeader.css';

const UserHeader = (props) => {
  const {
    user,
    username,
    uploadAvatar,
    followUser,
    unfollowUser,
    getFollowList,
    postCount,
  } = props;
  const avatarSrc = user.avatar ? `http://localhost:5000/uploads/${user.avatar}` : 'http://localhost:5000/uploads/no-img.png';

  const [ following, setFollowing ] = useState(user.following);
  const [ popup, setPopup ] = useState();
  const [ popupData, setPopupData ] = useState({});
  const [ avatar, setAvatar ] = useState(avatarSrc);


  const history = useHistory();
  let avatarInput = null;

  const handleAvatarIconClick = () => {
    avatarInput.click();
  }

  const handleFollowButtonClick = (username) => {
    console.log('TEST');
    console.log('>> following', following);
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
      setAvatar(res?.newAvatar);
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
    <div className="user-profile__header">
      {
        popup 
          &&
        <UserListPopup
          type={popup}
          data={popupData}
          setPopup={setPopup}
          setPopupData={setPopupData}
        />
      }
      <div
          className="user-profile__avatar"
          onClick={user.isOwnProfile ? handleAvatarIconClick : null}
          style={{ backgroundImage: `url(${avatar})`}}
        >
          <div className={user.isOwnProfile ? 'user-profile__avatar_hover' : null} />
        </div>
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
        <div className="user-profile__header-info">
          <h3>{username}</h3>
          {
            !user.isOwnProfile ?
              <button onClick={() => handleFollowButtonClick(username)}>{following ? 'Following' : 'Follow'}</button>
            :
              <button onClick={handleEditButtonClick}>Edit profile</button>
          }
          <div className="user-profile__user-stats">
            <span>{postCount} posts</span>
            <span onClick={() => handlePopupLinkClick('follower')}>{`${user.followerCount} followers`}</span>
            <span onClick={() => handlePopupLinkClick('followed')}>{`${user.followingCount} following`}</span>
          </div>
          <div className="user-profile__bio">
            <span>Something about me</span>
          </div>
        </div>
    </div>
  )
}

export default UserHeader;