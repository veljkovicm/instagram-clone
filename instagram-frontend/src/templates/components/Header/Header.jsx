import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Logo,
  SearchBar,
  NavigationMenu,
} from './components';

import './header.css';

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
      <Logo />
      <SearchBar />
      {
        isLoggedIn ?
          <NavigationMenu username={username} />
        : 
          <div className="page-header__buttons-wrapper">
            <button onClick={() => handleButtonClick('/sign_in')}>Sign In</button>
            <button onClick={() => handleButtonClick('/sign_up')}>Sign up</button>
          </div>
      }
    </div>
  )
}


export default Header;