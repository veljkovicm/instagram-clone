import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import { Helmet } from 'react-helmet';

import Loading from 'templates/components/Loading';

import './resetPassword.scss';


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
  const [ passwordVisible, setPasswordVisible ] = useState(false);

  const handleInputChange = (setValue) => (e) => {
    setValue(e.target.value);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    const { token } = qs.parse(location.search, { ignoreQueryPrefix: true });
    resetPassword({ newPassword: password, token });
  }

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <div className="reset-password">
      <Helmet><title>Reset password</title></Helmet>
      <div className="reset-password__inner">
        <Loading />
        <div className="reset-password__logo">Instagram</div>
        <div className="reset-password__form-wrapper">
          <form onSubmit={handleResetPassword} className="reset-password__form">
            <div>
              <input type={passwordVisible ? 'text' : 'password'} name="password" onChange={handleInputChange(setPassword)} value={password} />
              {
                password.length ?
                  <div className="password-visibility-toggle" onClick={handlePasswordVisibility}>
                    {passwordVisible ? 'Hide' : 'Show'}
                  </div>
                : null 
              }
            </div>
            <button type="submit" onClick={handleResetPassword}>{loading ? 'Loading...' : 'Reset password'}</button>
          </form>
        </div>
      </div>
    </div>
  )
};

ResetPassword.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  resetPassword: PropTypes.func.isRequired,
}


export default ResetPassword;
