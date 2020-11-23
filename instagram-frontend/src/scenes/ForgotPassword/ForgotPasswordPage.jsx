import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Loading from 'templates/components/Loading';

import './forgotPassword.css';


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
  }  

  const [ email, setEmail ] = useState('test111@test.com');

  // add onClickValidation


  const handleInputChange = (setValue) => (e) => {
    setValue(e.target.value);
  };

  const handleForgotPassowrd = (e) => {
    if (e.preventDefault) e.preventDefault();

    // const { error, errorMsg } = handleOnClickValidation() || {};

    // if (error) {
      // display error notification 
    //   // notify({ message: errorMsg, type: 'error' });
    // } else {
      forgotPassword({ email });
    // }
  }
  return (
    <>
      <Helmet><title>Reset password</title></Helmet>
      <div className="forgot_password form-wrapper">
        <Loading />
        <form onSubmit={handleForgotPassowrd}>
          <input type="text" name="email" label="email" onChange={handleInputChange(setEmail)} value={email} />
          <button type="submit" onClick={handleForgotPassowrd}>{loading ? 'Loading...' : 'Reset password'}</button>
        </form>
        <a href="/">Log in instead?</a>
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




