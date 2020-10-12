import React, { useState, useEffect } from 'react';
import { Redirect, Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

import Loading from '../../templates/components/Loading';

import './resetPassword.css';


const ResetPassword = (props) => {
  const {
    isLoggedIn,
    loading,
    resetPassword,
    // notify,
  } = props;
  const history = useHistory();
  const location = useLocation();


  // debug this
  if (isLoggedIn) {
    // return <Redirect to="/" />;
    history.push('/')
  }  

  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');

  // add onClickValidation


  const handleInputChange = (setValue) => (e) => {
    setValue(e.target.value);
  };

  const handleResetPassword = (e) => {
    if (e.preventDefault) e.preventDefault();

    // const { error, errorMsg } = handleOnClickValidation() || {};

    // if (error) {
      // display error notification 
    //   // notify({ message: errorMsg, type: 'error' });
    // } else {
    
    const { token } = qs.parse(location.search, { ignoreQueryPrefix: true });
      resetPassword({ newPassword: password, token });
    // }
  }
  return (
    <div className="reset_password form-wrapper">
      <Loading />
      <form onSubmit={handleResetPassword}>
        <input type="password" name="password" onChange={handleInputChange(setPassword)} value={password} />
        <input type="password" name="confirm-password" onChange={handleInputChange(setConfirmPassword)} value={confirmPassword} />
        <button type="submit" onClick={handleResetPassword}>{loading ? 'Loading...' : 'Set new password password'}</button>
      </form>
      <a href="/">Log in instead?</a>
    </div>
  )
};
  // PropTypes

export default ResetPassword;




