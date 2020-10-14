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
  } = props;

  return (
    <div className="page-header">
      <Logo />
      <SearchBar />
      <NavigationMenu />
    </div>
  )
}


export default Header;