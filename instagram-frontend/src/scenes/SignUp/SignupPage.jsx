import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { validateInput } from 'lib';
import {
  Header,
  ValidationIcon,
  Spinner,
} from 'components';

import './signupPage.scss';


const Signup = (props) => {
  const {
    isLoggedIn,
    loading,
    signup,
    checkAvailability,
  } = props;

  const [ userData, setUserData ] = useState({
    email: '',
    password: '',
    username: '',
    fullName: ''
  });

  const [ isValid, setIsValid ] = useState({
    email: false,
    password: false,
    username: false,
    fullName: false,
  });

  const [ hasChanged, setHasChanged ] = useState({
    email: false,
    password: false,
    username: false,
    fullName: false,
  });

  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUserData({ ...userData, password: e.target.value });

    if(e.target.value.length >= 2) {
      setIsValid({ ...isValid, password: true });
    } else {
      setIsValid({ ...isValid, password: false });
    }
  }

  const handleEmailValidation = async () => {
    const validatedEmail = validateInput({ type: 'email', data: userData.email })
    const emailTaken = await checkAvailability({ email: userData.email });

    setHasChanged({ ...hasChanged, email: true });
    setIsValid({ ...isValid, email: validatedEmail && !emailTaken });
  }

  const handleUsernameValidation = async () => {
    const validatedUsername = validateInput({ type: 'username', data: userData.username });
    const usernameTaken = await checkAvailability({ username: userData.username });

    setHasChanged({ ...hasChanged, username: true });
    setIsValid({ ...isValid, username: !!validatedUsername && !usernameTaken });
  }

  const handlePasswordValidation = () => {
    setHasChanged({ ...hasChanged, password: true });
  }

  const handleFullNameValidation = () => {
    const validatedFullName = validateInput({ type: 'full-name', data: userData.fullName });

    setHasChanged({ ...hasChanged, fullName: true });
    setIsValid({ ...isValid, fullName: validatedFullName });
  }

  const handleSignup = (e) => {
    e.preventDefault();
    signup(userData);
  }

  return (
    <div className="signup-page">
      <Helmet><title>Instagram - Sign up</title></Helmet>
      <Header />
      <div className="signup-page__wrapper">
        <div className="signup-page__logo">Instagram</div>
        <h4 className="signup-page__description">Sign up to see photos and videos from your friends.</h4>
        <div className="signup-page__facebook-link-wrapper">
          <div className="signup-page__facebook-link">
            <span className="signup-page__facebook-link__icon"/>
            <span className="signup-page__facebook-link__text">Log in with Facebook</span>
          </div>
        </div>
        <div className="auth-page-divider"><span>OR</span></div>
        <div className="signup-page__form-wrapper">
          <form onSubmit={handleSignup} className="signup-page__form">
            <div className="signup-page__form__input-wrapper">
              <input
                type="text"
                name="email"
                onChange={handleInputChange}
                value={userData.email}
                onBlur={handleEmailValidation}
                className={`login-page__form__input ${userData.email.length ? 'not-empty' : ''}`}
              />
              <label htmlFor="email" className={`login-page__form__input-label ${userData.email.length ? 'not-empty' : ''}`}>Email</label>
              <ValidationIcon changed={hasChanged.email} valid={isValid.email} />
            </div>
            <div className="signup-page__form__input-wrapper">
              <input
                type="text"
                name="fullName"
                onChange={handleInputChange}
                value={userData.fullName}
                onBlur={handleFullNameValidation}
                className={`login-page__form__input ${userData.fullName.length ? 'not-empty' : ''}`}
              />
              <label htmlFor="fullName" className={`login-page__form__input-label ${userData.fullName.length ? 'not-empty' : ''}`}>Full name</label>
              <ValidationIcon changed={hasChanged.fullName} valid={isValid.fullName} />
            </div>
            <div className="signup-page__form__input-wrapper">
              <input
                type="text"
                name="username"
                maxLength="30"
                onChange={handleInputChange}
                value={userData.username}
                onBlur={handleUsernameValidation}
                className={`login-page__form__input ${userData.username.length ? 'not-empty' : ''}`}
              />
              <label htmlFor="username" className={`login-page__form__input-label ${userData.username.length ? 'not-empty' : ''}`}>Username</label>
              <ValidationIcon changed={hasChanged.username} valid={isValid.username} />
            </div>
            <div className="signup-page__form__input-wrapper">
              <input
                type="password"
                name="password"
                onChange={handlePasswordChange}
                value={userData.password}
                onBlur={handlePasswordValidation}
                className={`login-page__form__input ${userData.password.length ? 'not-empty' : ''}`}
              />
              <label htmlFor="username" className={`login-page__form__input-label ${userData.password.length ? 'not-empty' : ''}`}>Password</label>
              <ValidationIcon changed={hasChanged.password} valid={isValid.password} />
            </div>
            <button
              className="button-blue"
              type="submit"
              onClick={handleSignup}
              disabled={!Object.values(isValid).every(i => i === true) || loading}
            >
              {loading ? <Spinner /> : 'Sign up'}
            </button>
          </form>
          <p className="signup-page__disclaimer">
            By signing up, you agree to our <b>Terms</b>, <b>Data Policy</b> and <b>Cookies Policy</b>
          </p>
        </div>
      </div>
      <div className="signup-page__login-link">
        <p>Have an account?<a href="/sign_in">Log in</a></p>
      </div>
      <div className="auth-page-app-links">
        <p>Get the app</p>
        <div className="auth-page-app-links__ios" alt="ios" />
        <div className="auth-page-app-links__android" alt="android" />
      </div>
    </div>
  )
};

Signup.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  signup: PropTypes.func.isRequired,
  checkAvailability: PropTypes.func.isRequired,
}

export default Signup;
