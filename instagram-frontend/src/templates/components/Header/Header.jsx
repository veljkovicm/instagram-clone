import React from 'react';
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
  } = props;

  console.log('>> props', props);

  return (
    <div className="page-header">
      <Logo />
      <SearchBar />
      <NavigationMenu username={username} />
    </div>
  )
}


export default Header;