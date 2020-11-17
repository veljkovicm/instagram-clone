import React, { useState } from 'react';
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Loading from '../../templates/components/Loading';


import './loginPage.css';

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
    history.push('/feed')
  }  

  const [ username, setUsername ] = useState('test2@test.com');
  const [ password, setPassword ] = useState('11');
  const [ passwordVisible, setPasswordVisible ] = useState(false);

  const handleInputChange = (setValue) => (e) => {
    setValue(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login({
      username,
      password,
      rememberMe: true,
    });
  }

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }


  return (
    <>
    <Helmet><title>Instagram - Log in</title></Helmet>
      <div className="auth form-wrapper">
        <Loading />
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            onChange={handleInputChange(setUsername)}
            value={username}
          />
          <div>
          <div className="password-input-wrapper">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              onChange={handleInputChange(setPassword)}
              value={password}
            />
            <div
              className="password-visibility-toggle"
              onClick={handlePasswordVisibility}>
            </div>
          </div>
          </div>
          <button type="submit" onClick={handleLogin}>{loading? 'Loading...' : 'login'}</button>
        </form>
        <p>
          Don't have an account?
          <a href="/sign_up">Register here!</a>
        </p>
        <a href="/forgot_password">Forgot password?</a>
      </div>
    </>
  )
};

export default Login;





// PropTypes