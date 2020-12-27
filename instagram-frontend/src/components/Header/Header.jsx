import React from 'react';
import PropTypes from 'prop-types';
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

  return (
    <div className="page-header">
      <div className="page-header__inner">
        <Logo />
        {
          isLoggedIn
            &&
          <>
            <SearchBar />
            <NavigationMenu username={username} path={path} />
          </>
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
