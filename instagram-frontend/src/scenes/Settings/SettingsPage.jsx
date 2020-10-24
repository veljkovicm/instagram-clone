import React from 'react';
import Header from '../../templates/components/Header/index.js';

const Settings = (props) => {
  const {
    username,
    fullName,
    email,
    website,
    bio,
    phoneNumber,
    gender,
    avatar,
  } = props.user;
  return (
    <>
    <Header />
    <div className="settings">
    
    </div>
    </>
  )
}

export default Settings;