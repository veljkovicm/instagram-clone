import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useLocation } from 'react-router-dom';
import qs from 'qs';
import { Helmet } from 'react-helmet';
import { Header, Spinner } from 'components';

import './resetPassword.scss';


const ResetPassword = (props) => {
  const {
    isLoggedIn,
    loading,
    resetPassword,
  } = props;
  const location = useLocation();

  const [ password, setPassword ] = useState('');
  const [ passwordVisible, setPasswordVisible ] = useState(false);

  if (isLoggedIn) {
    return <Redirect to="/" />
  }

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
      <Header />
      <div className="reset-password__inner">
        <div className="reset-password__logo">Instagram</div>
        <div className="reset-password__form-wrapper">
          <form onSubmit={handleResetPassword} className="reset-password__form">
            <div className="reset-password__form__input-wrapper psw">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                onChange={handleInputChange(setPassword)}
                value={password}
                className={`reset-password__form__input ${password.length ? 'not-empty' : ''}`}
              />
              <label htmlFor="password" className={`login-page__form__input-label ${password.length ? 'not-empty' : ''}`}>New Password</label>
              {
                password.length ?
                  <div className="password-visibility-toggle" onClick={handlePasswordVisibility}>
                    {passwordVisible ? 'Hide' : 'Show'}
                  </div>
                : null
              }
            </div>
            <button
              className="button-blue"
              type="submit"
              onClick={handleResetPassword}
              disabled={!password.length || loading}
            >
              {loading ? <Spinner /> : 'Reset password'}
            </button>
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
