import React, { useState } from 'react';
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { validateInput } from '../../lib/validators.js';
import ValidationIcon from '../../templates/components/ValidationIcon.jsx';

import Loading from '../../templates/components/Loading';


import './signupPage.css';


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
    <>
      <Helmet><title>Instagram - Sign up</title></Helmet>
      <div className="signup form-wrapper">
        <Loading />
        <form onSubmit={handleSignup}>
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
        <p>
          Already have an account?
          <a href="/sign_in">Log in instead</a>
        </p>
      </div>
    </>
  )
};
  // PropTypes

export default Signup;




