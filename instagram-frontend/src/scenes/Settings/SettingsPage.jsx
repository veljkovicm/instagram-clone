import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../../templates/components/Header/index.js';
import './settingsPage.css'

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


  const handleChange = (setValue) => (e) => {
    setValue(e.target.value);
  }

  const handleAvatarClick = () => {
    avatarInput.click();
  }

  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    uploadAvatar({ formData });
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

  const avatarSrc = props.user.avatar ? `http://localhost:5000/uploads/${props.user.avatar}` : 'http://localhost:5000/uploads/no-img.png';

  return (
    <>
    <Header />
    <div className="settings">
      <div className="settings_profile">
        <form className="settings__profile-avatar-form" onSubmit={handleAvatarSubmit}>
          <div className="settings__profile-left">
            <div className="settings__profile-left__avatar" onClick={handleAvatarClick} style={{ backgroundImage: `url(${avatarSrc})`}}>
              <div className="settings__profile_left__avatar-hover"></div>
            </div>
            <input type="file" hidden name="avatar1" onChange={handleAvatarSubmit} ref={(input) => { avatarInput = input; }} />
          </div>
          <div className="settings__profile-right">
            <div className="settings__profile-right__username">
              {username}
            </div>
            <div className="settings__profile-right__avatar-link">
              <span onClick={handleAvatarClick}>Change Profile Photo</span>
            </div>
          </div>
        </form>
      </div>
      <div className="settings__profile-form__wrapper">
        <form className="settings__profile-form" onSubmit={handleSubmit}>
          <div className="settings__profile-form__name">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" onChange={handleChange(setName)} value={name} />
          </div>
          <div className="settings__profile-form__username">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={handleChange(setUsername)} value={username} />
          </div>
          <div className="settings__profile-form__website">
            <label htmlFor="website">Website</label>
            <input type="text" name="website" onChange={handleChange(setWebsite)} value={website} />
          </div>
          <div className="settings__profile-form__bio">
            <label htmlFor="bio">Bio</label>
            <input type="text" name="bio" onChange={handleChange(setBio)} value={bio} />
          </div>
          <div className="settings__profile-form__email">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={handleChange(setEmail)} value={email} />
          </div>
          <div className="settings__profile-form__phone-number">
            <label htmlFor="phone-number">Phone Number</label>
            <input type="text" name="phone-number" onChange={handleChange(setPhoneNumber)} value={phoneNumber} />
          </div>
          <div className="settings__profile-form__gender">
            <label htmlFor="gender">Gender</label>
            <input type="text" name="gender" onChange={handleChange(setGender)} value={gender}/>
          </div>
        </form>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    
    </div>
    </>
  )
}

Settings.propTypes = {
  uploadAvatar: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
}

export default Settings;