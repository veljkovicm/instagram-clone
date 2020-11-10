import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loading from 'templates/components/Loading';

import './loginPage.scss';

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
    <div className="login-page">
    <Helmet><title>Instagram - Log in</title></Helmet>
      <div className="login-page__image-wrapper"></div>
      <div className="login-page__main-wrapper">
        <div className="login-page__main-wrapper__inner">
          <h1 className="login-page__logo">Instagram</h1>
          <div className="login-page__form-wrapper">
            <Loading />
            <form onSubmit={handleLogin} className="login-page__form">
              <div className="login-page__form__input-wrapper">
                <input
                  type="text"
                  name="username"
                  label="username"
                  onChange={handleInputChange(setUsername)}
                  value={username}
                  className={`login-page__form__input ${username.length ? 'not-empty' : ''}`}
                />
                <label htmlFor="username" className={`login-page__form__input-label ${username.length ? 'not-empty' : ''}`}>Username or email</label>
              </div>
              <div className="login-page__form__input-wrapper psw">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  onChange={handleInputChange(setPassword)}
                  value={password}
                  className={`login-page__form__input ${password.length ? 'not-empty' : ''}`}
                />
                <label htmlFor="password" className={`login-page__form__input-label ${password.length ? 'not-empty' : ''}`}>Password</label>
                {
                  password.length ?
                    <div className="password-visibility-toggle" onClick={handlePasswordVisibility}>
                      {passwordVisible ? 'Hide' : 'Show'}
                    </div>
                  : null 
                  }
              </div>
              <button
                type="submit"
                onClick={handleLogin}
                className="button-blue"
              >
                {loading ? 'Loading...' : 'Log In'}
              </button>
            </form>

          </div>
          <div className="login-page__facebook-link-wrapper">
            <div className="login-page__facebook-link-divider">
              <span>OR</span>
            </div>
            <div className="login-page__facebook-link">Log in with Facebook</div>
          </div>
          <a href="/forgot_password" className="login-page__forgot-password-link">Forgot password?</a>
        </div>
        <div className="login-page__signup-link">
          <p>
            Don't have an account?
            <a href="/sign_up">Sign up</a>
          </p>
        </div>
        <div className="login-page__app-links">
          <p>Get the app</p>
          <div src="http://via.placeholder.com/136x40" className="login-page__app-links__ios" alt="ios"/>
          <div src="http://via.placeholder.com/136x40" className="login-page__app-links__android" alt="android"/>
        </div>
      </div>
    </div>
  )
};

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  login: PropTypes.func.isRequired,
}

export default Login;
