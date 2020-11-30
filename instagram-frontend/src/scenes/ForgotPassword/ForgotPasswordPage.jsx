import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Loading from 'templates/components/Loading';

import './forgotPassword.scss';


const ForgotPassword = (props) => {
  const {
    isLoggedIn,
    loading,
    forgotPassword,
    // notify,
  } = props;
  const history = useHistory()


  // debug this
  if (isLoggedIn) {
    // return <Redirect to="/" />;
    history.push('/')
  };

  const [ email, setEmail ] = useState('test111@test.com');

  const handleInputChange = (setValue) => (e) => {
    setValue(e.target.value);
  };

  const handleForgotPassowrd = (e) => {
    e.preventDefault();

    forgotPassword({ email });
  }
  return (
    <>
      <Helmet><title>Reset password</title></Helmet>
      <div className="forgot-password__wrapper">
        <div className="forgot-password">
          <Loading />
          <div className="forgot-password__description">
            <div className="forgot-password__description-image" />
            <h4 className="forgot-password__description-title">Trouble Logging In?</h4>
            <p className="forgot-password__description-text">Enter your email or username and we'll send you a link to get back into your account</p>
          </div>
          <div className="forgot-password__form-wrapper">
            <form onSubmit={handleForgotPassowrd}>
              <input type="text" name="email" label="email" onChange={handleInputChange(setEmail)} value={email} />
              <button type="submit" onClick={handleForgotPassowrd}>{loading ? 'Loading...' : 'Send Login Link'}</button>
            </form>
          </div>
          <div className="forgot-password__signup-link__wrapper">

            <div className="forgot-password__signup-link__divider">
              <span>OR</span>
            </div>
            <a href="/sign_up" className="forgot-password__signup-link">Create New Account</a>
          </div>
          <a href="/" className="forgot-password__login-link">Back To Login</a>
        </div>
      </div>
    </>
  )
};

ForgotPassword.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  forgotPassword: PropTypes.func.isRequired,
}

export default ForgotPassword;




