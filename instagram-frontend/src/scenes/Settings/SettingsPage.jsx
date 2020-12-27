import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'components';

import './settingsPage.scss'

const Settings = (props) => {
  const {
    uploadAvatar,
    updateSettings,
  } = props;

  let avatarInput = null;

  const [ name, setName ] = useState(props.user.fullName || '');
  const [ username, setUsername ] = useState(props.user.username);
  const [ email, setEmail ] = useState(props.user.email);
  const [ website, setWebsite ] = useState(props.user.website || '');
  const [ bio, setBio ] = useState(props.user.bio || '');
  const [ phoneNumber, setPhoneNumber ] = useState(props.user.phoneNumber || '');
  const [ gender, setGender ] = useState(props.user.gender || '');
  const [ avatar, setAvatar ] = useState(`http://localhost:5000/uploads/${props.user.avatar}` ||  'http://localhost:5000/uploads/no-img.png'); // refactor, urls should not be visible
  const [ settingsChanged, setSettingsChanged ] = useState(false);


  const handleChange = (setValue) => (e) => {
    setValue(e.target.value);
    if(!settingsChanged) {
      setSettingsChanged(true);
    }
  }

  const handleAvatarClick = () => {
    avatarInput.click();
  }

  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    uploadAvatar({ formData }).then((res) => {
      setAvatar(res.newAvatar);
    });
  }

  const handleSubmit = () => {
    const userData = {
      fullName: name,
      username,
      email,
      website,
      bio,
      phoneNumber,
      gender,
    };
    updateSettings(userData);
  }

  return (
    <>
      <Header />
      <div className="page-content">
        <div className="settings__page">
          <div className="settings__tabs">
            <span className="settings__tabs__link active">Edit profile</span>
            <span className="settings__tabs__link forbidden">Change Password</span>
            <span className="settings__tabs__link forbidden">Apps and Websites</span>
            <span className="settings__tabs__link forbidden">Email and SMS</span>
            <span className="settings__tabs__link forbidden">Push Notifications</span>
            <span className="settings__tabs__link forbidden">Manage Contacts</span>
            <span className="settings__tabs__link forbidden">Privacy and Security</span>
            <span className="settings__tabs__link forbidden">Login Activity</span>
            <span className="settings__tabs__link forbidden">Emails from Instagram</span>
          </div>
          <div className="settings__profile">
              <div className="settings__profile__section">
                <div className="settings__profile__section__label">
                  <div
                    className="settings__profile__avatar"
                    onClick={handleAvatarClick}
                    style={{ backgroundImage: `url(${avatar})`}}
                  />
                </div>
                <div className="settings__profile__username-wrapper">
                  <h4 className="settings__profile__username">{username}</h4>
                  <span className="settings__profile__avatar-link" onClick={handleAvatarClick}>Change Profile Photo</span>
                </div>
                <form className="settings__profile__avatar-form" onSubmit={handleAvatarSubmit}>
                  <input
                    type="file"
                    hidden
                    name="avatar"
                    onChange={handleAvatarSubmit}
                    ref={(input) => { avatarInput = input }}
                  />
                </form>
              </div>
            <div className="settings__profile__form__wrapper">
              <form className="settings__profile__form" onSubmit={handleSubmit}>
                <div className="settings__profile__section">
                  <div className="settings__profile__section__label">
                    <label htmlFor="settings-name">Name</label>
                  </div>
                  <div className="settings__profile__section__input-wrapper">
                    <input
                      className="settings__profile__section__input"
                      type="text"
                      name="name"
                      onChange={handleChange(setName)}
                      value={name}
                      id="settings-name"
                    />
                    <div className="settings__profile__section__description">
                      <span>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</span>
                      <span>You can only change your name twice within 14 days.</span>
                    </div>
                  </div>
                </div>
                <div className="settings__profile__section">
                  <div className="settings__profile__section__label">
                    <label htmlFor="settings-username">Username</label>
                  </div>
                  <div className="settings__profile__section__input-wrapper">
                    <input
                      className="settings__profile__section__input"
                      type="text"
                      name="username"
                      maxLength="30"
                      onChange={handleChange(setUsername)}
                      value={username}
                      placeholder="Username"
                      id="settings-username"
                    />
                    <div className="settings__profile__section__description">
                      <span>
                        In most cases, you'll be able to change your username back to kaplareviccobe for another 14 days.
                        <a href="#" className="forbidden">Learn more</a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="settings__profile__section">
                  <div className="settings__profile__section__label">
                    <label htmlFor="settings-website">Website</label>
                  </div>
                  <input
                    className="settings__profile__section__input"
                    type="text"
                    name="website"
                    onChange={handleChange(setWebsite)}
                    value={website}
                    placeholder="Website"
                    id="settings-website"
                  />
                </div>
                <div className="settings__profile__section">
                  <div className="settings__profile__section__label">
                    <label htmlFor="settings-bio">Bio</label>
                  </div>
                  <div className="settings__profile__section__input-wrapper">
                    <textarea
                      className="settings_profile__section__textarea"
                      name="bio"
                      cols="30"
                      rows="3"
                      maxLength="150"
                      onChange={handleChange(setBio)}
                      value={bio}
                      id="settings-bio"
                    />
                    <div className="settings__profile__section__description">
                      <span>
                        <b>Personal information</b>
                        Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="settings__profile__section">
                  <div className="settings__profile__section__label">
                    <label htmlFor="settings-email">Email</label>
                  </div>
                  <div className="settings__profile__section__input-wrapper">
                    <input
                      className="settings__profile__section__input"
                      type="text"
                      name="email"
                      onChange={handleChange(setEmail)}
                      value={email}
                      placeholder="Email"
                      id="settings-email"
                    />
                  </div>
                </div>
                <div className="settings__profile__section">
                  <div className="settings__profile__section__label">
                    <label htmlFor="settings-phone-number">Phone Number</label>
                  </div>
                  <input
                    className="settings__profile__section__input"
                    type="text"
                    name="phone-number"
                    onChange={handleChange(setPhoneNumber)}
                    value={phoneNumber}
                    placeholder="Phone Number"
                    id="settings-phone-number"
                  />
                </div>
                <div className="settings__profile__section">
                  <div className="settings__profile__section__label">
                    <label htmlFor="settings-gender">Gender</label>
                  </div>
                  <input
                    className="settings__profile__section__input"
                    type="text"
                    name="gender"
                    onChange={handleChange(setGender)}
                    value={gender}
                    placeholder="Gender"
                    id="settings-gender"
                  />
                </div>
              </form>
              <button
                className="settings__profile__form__button"
                onClick={handleSubmit}
                disabled={!settingsChanged}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Settings.propTypes = {
  uploadAvatar: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
}

export default Settings;