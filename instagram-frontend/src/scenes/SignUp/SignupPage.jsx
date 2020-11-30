import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { validateInput } from 'lib/validators';
import ValidationIcon from 'templates/components/ValidationIcon.jsx';

import Loading from 'templates/components/Loading';

import './signupPage.scss';


const Signup = (props) => {
  const {
    isLoggedIn,
    loading,
    signup,
    // notify,
    checkAvailability,
  } = props;
  const history = useHistory()


  if (isLoggedIn) {
    history.push('/')
  }

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

  const handleEmailValidation = async (e) => {
    const validatedEmail = validateInput({ type: 'email', data: userData.email })
    const emailTaken = await checkAvailability({ email: userData.email });

    setHasChanged({ ...hasChanged, email: true });
    setIsValid({ ...isValid, email: validatedEmail && !emailTaken });
  }

  const handleUsernameValidation = async (e) => {
    const validatedUsername = validateInput({ type: 'username', data: userData.username });
    const usernameTaken = await checkAvailability({ username: userData.username });

    setHasChanged({ ...hasChanged, username: true });
    setIsValid({ ...isValid, username: validatedUsername && !usernameTaken });
  }

  const handlePasswordValidation = (e) => {
    setHasChanged({ ...hasChanged, password: true });
  }

  const handleFullNameValidation = (e) => {
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
          <Loading />
          <form onSubmit={handleSignup} className="signup-page__form">
            <input
              type="text"
              name="email"
              onChange={handleInputChange}
              value={userData.email}
              placeholder="email"
              onBlur={handleEmailValidation}
            />
            <ValidationIcon changed={hasChanged.email} valid={isValid.email} />
            <input
              type="text"
              name="username"
              onChange={handleInputChange}
              value={userData.username}
              placeholder="username"
              onBlur={handleUsernameValidation}
            />
            <ValidationIcon changed={hasChanged.username} valid={isValid.username} />
            <input
              type="text"
              name="fullName"
              onChange={handleInputChange}
              value={userData.fullName}
              placeholder="full name"
              onBlur={handleFullNameValidation}
            />
            <ValidationIcon changed={hasChanged.fullName} valid={isValid.fullName} />
            <input
              type="password"
              name="password"
              onChange={handlePasswordChange}
              value={userData.password}
              onBlur={handlePasswordValidation}
            />
            <ValidationIcon changed={hasChanged.password} valid={isValid.password} />

            <button
              type="submit"
              onClick={handleSignup}
              disabled={!Object.values(isValid).every(i => i === true)}
            >
              {loading ? 'Loading...' : 'signup'}
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
        <div src="http://via.placeholder.com/136x40" className="auth-page-app-links__ios" alt="ios" />
        <div src="http://via.placeholder.com/136x40" className="auth-page-app-links__android" alt="android" />
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
