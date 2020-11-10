import React, { useState } from 'react';
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { validateInput } from '../../lib/validators.js';

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
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  };

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
          <input type="text" name="email" onChange={handleInputChange} value={userData.email} placeholder="email" onBlur={handleEmailValidation} />
          { hasChanged.email ? !isValid.email ? <div>Not valid</div> : <div>VALID</div> : null}
          <input type="text" name="username" onChange={handleInputChange} value={userData.username} placeholder="username" onBlur={handleUsernameValidation} />
          { hasChanged.username ? !isValid.username ? <div>Not valid</div> : <div>VALID</div> : null}
          <input type="text" name="full-name" onChange={handleInputChange} value={userData.fullName} placeholder="full name" />
          <input type="password" name="password" onChange={handleInputChange} value={userData.password} />
          
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




