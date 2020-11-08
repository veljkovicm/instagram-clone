import React, { useState, useEffect } from 'react';
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Loading from '../../templates/components/Loading';


import './signupPage.css';


const Signup = (props) => {
  const {
    isLoggedIn,
    loading,
    signup,
    // notify,
  } = props;
  const history = useHistory()


  if (isLoggedIn) {
    history.push('/')
  }  

  const [ email, setEmail ] = useState('test111@test.com');
  const [ password, setPassword ] = useState('11');
  const [ confirmPassword, setConfirmPassword] = useState('');
  const [ username, setUsername ] = useState('');
  const [ fullName, setFullName ] = useState('');


  // add onClickValidation - checks if password match


  const handleInputChange = (setValue) => (e) => {
    setValue(e.target.value);
  };

  const handleSignup = (e) => {
    if (e.preventDefault) e.preventDefault();

    // const { error, errorMsg } = handleOnClickValidation() || {};

    // if (error) {
      // display error notification 
    //   // notify({ message: errorMsg, type: 'error' });
    // } else {
      signup({
        email,
        password,
        username,
        fullName,
      });
    // }
    }
    return (
      <>
        <Helmet><title>Instagram - Sign up</title></Helmet>
        <div className="signup form-wrapper">
          <Loading />
          <form onSubmit={handleSignup}>
            <input type="text" name="email" onChange={handleInputChange(setEmail)} value={email} placeholder="email" />
            <input type="text" name="username" onChange={handleInputChange(setUsername)} value={username} placeholder="username" />
            <input type="text" name="full-name" onChange={handleInputChange(setFullName)} value={fullName} placeholder="full name" />
            <input type="password" name="password" onChange={handleInputChange(setPassword)} value={password} />
            <input type="password" name="confirm-password"  onChange={handleInputChange(setConfirmPassword)} value={confirmPassword} placeholder="confirm password"/>
            <button type="submit" onClick={handleSignup}>{loading? 'Loading...' : 'signup'}</button>
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




