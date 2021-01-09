import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import './userListPopup.scss';

const UserListPopup = (props) => {
  const {
    type,
    data,
    setPopup,
    setPopupData,
    unfollowUser,
    followUser,
    myUsername,
    setFollowingCount,
  } = props;

  const [ usersData, setUsersData ] = useState(data); 

  const params = useParams();
  const { username: currentPageUsername } = params;

  const closePopup = () => {
    setPopup();
    setPopupData({});
  }

  const changeFollowState = ({ isFollowing, index }) => {
    setUsersData(prevData => {
      return prevData.map((user, i) => {
        if(i === index) {
          return { ...prevData[index], isFollowing }
        } else {
          return user;
        }
      })
    })
  }

  const handleFollowButtonClick = ({ username, following, index }) => {
    if(following) {
      changeFollowState({ isFollowing: false, index });
      unfollowUser(username);
      if(currentPageUsername === myUsername) {
        setFollowingCount((prev) => prev - 1)
      }
    } else {
      changeFollowState({ isFollowing: true, index });
      followUser(username);
      if(currentPageUsername === myUsername) {
        setFollowingCount((prev) => prev + 1)
      }
    }
  }

  const linkTarget = (username) => {
    window.history.pushState({path: `/u/${username}`}, '', `/u/${username}`);
    window.location.reload();
  };

  const markup = (
    usersData.map((user, index) =>
      <div className="user-list__single" key={user[type].id}>
        <div className="user-list__single__avatar" onClick={() => linkTarget(user[type].username)}>
          <img
            src={user[type].avatar ? `http://localhost:5000/uploads/${user[type].avatar}` : 'http://localhost:5000/uploads/no-img.png'}
            alt="avatar"
            width="30"
          />
        </div>
        <div className="user-list__single__info">
          <div className="user-list__single__info__username" onClick={() => linkTarget(user[type].username)}>
            {user[type].username}
          </div>
          <div  className="user-list__single__info__name">
            {user[type].fullName}
          </div>
        </div>
        <div className="user-list__single__button-wrapper">
        {
          myUsername !== user[type].username
            ? 
              <button
                className={` user-list__single__button ${user.isFollowing ? 'btn-white' : 'btn-blue'}`}
                type="button" 
                onClick={() => handleFollowButtonClick({
                  username: user[type].username,
                  following: user.isFollowing,
                  index,
                })}
              >
                {user.isFollowing ? 'Following' : 'Follow'}
              </button>
            : 
              null
        }
        </div>
      </div> 
    )
  );

  return (
    <div>
      <div
        className="user-list__backdrop"
        onClick={closePopup}
        style={{ display: type === null ? 'none' : 'block'}}
      />
        <div className="user-list">
          <div className="user-list__header">
            <h4 className="user-list__header__title">{type === 'follower' ? 'Followers' : 'Following'}</h4>
            <div className="user-list__header__close-icon" onClick={closePopup} />
          </div>
          <div className="user-list__list-wrapper">
            {markup}
          </div>
        </div>
    </div>
  )
}

UserListPopup.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  setPopup: PropTypes.func.isRequired,
  setPopupData: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  myUsername: PropTypes.string,
  setFollowingCount: PropTypes.func.isRequired,
}

export default UserListPopup;
