import React from 'react';

const Popup = (props) => {
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
      <div className="follow-list__single" key={user[type].id}>
        <div className="follow-list__single__avatar"></div>
        <div className="follow-list__single__info">
          {user[type].username}
          {user[type].fullName}
        </div>
        <div className="follow-list__single__button-wrapper">
        <button type="button" onClick={closePopup}>Follow</button>
        </div>
      </div>
    )
  )

  return (
    <div>
    <div className="follow-list__backdrop" onClick={closePopup} style={{ display: type === null ? 'none' : 'block'}} />
      <div className="follow-list">
        <div className="follow-list__header">
          <h4 className="follow-list__header__title">{type === 'follower' ? 'Followers' : 'Following'}</h4>
          <span className="follow-list__header__close-icon" onClick={closePopup}>x</span>
        </div>
        {markup}
      </div>
    </div>
  )
}

export default Popup;
