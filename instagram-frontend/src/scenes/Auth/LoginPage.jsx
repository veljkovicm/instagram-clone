import React, { useState, useEffect } from 'react';
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom';

import Loading from '../../templates/components/Loading';


import './loginPage.css';

const createAccountURL = '/sign_up';

const Login = (props) => {
  const {
    isLoggedIn,
    loading,
    login,
    // notify,
  } = props;
  const history = useHistory()


  // debug this
  if (isLoggedIn) {
    // return <Redirect to="/" />;
    history.push('/')
  }  

  const [ email, setEmail ] = useState('test111@test.com');
  const [ password, setPassword ] = useState('11');

  // add onClickValidation


  const handleInputChange = (setValue) => (e) => {
    setValue(e.target.value);
  };

  const handleLogin = (e) => {
    if (e.preventDefault) e.preventDefault();

    // const { error, errorMsg } = handleOnClickValidation() || {};

    // if (error) {
      // display error notification 
    //   // notify({ message: errorMsg, type: 'error' });
    // } else {
      login({
        email,
        password,
        rememberMe: true,
      });
    // }
    }
    return (
      <div className="auth">
        <Loading />
        <form onSubmit={handleLogin}>
          <input type="text" name="email" label="email" onChange={handleInputChange(setEmail)} value={email} />
          <input type="password" name="password" label="password" onChange={handleInputChange(setPassword)} value={password} />
          <button type="submit" onClick={handleLogin}>{loading? 'Loading...' : 'login'}</button>
        </form>
      </div>
    )
  };

  export default Login;





// PropTypes