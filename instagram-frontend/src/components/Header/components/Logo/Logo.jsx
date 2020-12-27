import React from 'react';
import { useHistory } from 'react-router-dom';

import './logo.scss';

const Logo = () => {
  const history = useHistory();
  const handleClick = () => {
    if(window.location.pathname !== '/feed') {
      history.push('/')
    }
  };

  return <img onClick={handleClick} className="header-logo" src={'/header-logo.png'} alt="logo"/>
}

export default Logo;