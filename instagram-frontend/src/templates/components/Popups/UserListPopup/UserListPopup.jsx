import React from 'react';
import PropTypes from 'prop-types';

import './userListPopup.css';

const UserListPopup = (props) => {
  const {
    type,
    data,
    setPopup,
    setPopupData,
  } = props;

  const closePopup = () => {
    setPopup();
    setPopupData({});
  }

  const markup = (
    data.map((user) =>
      <div className="user-list__single" key={user[type].id}>
        <div className="user-list__single__avatar"></div>
        <div className="user-list__single__info">
          {user[type].username}
          {user[type].fullName}
        </div>
        <div className="user-list__single__button-wrapper">
        <button type="button" onClick={closePopup}>Follow</button>
        </div>
      </div>
    )
  )

  return (
    <div>
    <div className="user-list__backdrop" onClick={closePopup} style={{ display: type === null ? 'none' : 'block'}} />
      <div className="user-list">
        <div className="user-list__header">
          <h4 className="user-list__header__title">{type === 'follower' ? 'Followers' : 'Following'}</h4>
          <span className="user-list__header__close-icon" onClick={closePopup}>x</span>
        </div>
        {markup}
      </div>
    </div>
  )
}

UserListPopup.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  setPopup: PropTypes.func.isRequired,
  setPopupData: PropTypes.func.isRequired,
}

export default UserListPopup;
