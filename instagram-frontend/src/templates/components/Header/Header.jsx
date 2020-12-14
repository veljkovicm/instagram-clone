import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Logo,
  SearchBar,
  NavigationMenu,
} from './components';

import './header.scss';

const Header = (props) => {
  const {
    path,
    username,
    isLoggedIn,
  } = props;
  const history = useHistory();

  const handleButtonClick = (path) => {
    history.push(path);
  }

  return (
    <div className="page-header">
      <div className="page-header__inner">
        <Logo />
        <SearchBar />
        {
          isLoggedIn ?
            <NavigationMenu username={username} path={path} />
          : 
            <div className="page-header__buttons-wrapper">
              <button onClick={() => handleButtonClick('/sign_in')}>Sign In</button>
              <button onClick={() => handleButtonClick('/sign_up')}>Sign up</button>
            </div>
        }
      </div>
    </div>
  )
}

Header.propTypes = {
  path: PropTypes.string,
  username: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
}

export default Header;
