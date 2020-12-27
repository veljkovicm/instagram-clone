import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from 'templates/components/Header';

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
      <Header />
      <div className="forgot-password__wrapper">
        <div className="forgot-password">
          <div className="forgot-password__description">
            <div className="forgot-password__description-image" />
            <h4 className="forgot-password__description-title">Trouble Logging In?</h4>
            <p className="forgot-password__description-text">Enter your email or username and we'll send you a link to get back into your account</p>
          </div>
          <div className="forgot-password__form-wrapper">
            <form onSubmit={handleForgotPassowrd}  className="forgot-password__form">
              <div className="forgot-password__form__input-wrapper">
                <input
                  type="text"
                  name="email"
                  onChange={handleInputChange(setEmail)}
                  value={email}
                  className="forgot-password__form__input"
                  className={`forgot-password__form__input ${email.length ? 'not-empty' : ''}`}
                />
                <label htmlFor="email" className={`forgot-password__form__input-label ${email.length ? 'not-empty' : ''}`}>Email</label>
              </div>
              <button
                className="button-blue"
                type="submit"
                onClick={handleForgotPassowrd}
              >
                {loading ? 'Loading...' : 'Send Login Link'}
              </button>
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




