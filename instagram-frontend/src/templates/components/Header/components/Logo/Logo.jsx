import React from 'react';
import { useHistory } from 'react-router-dom';

import './logo.css';

const Logo = () => {
  const history = useHistory();
  const handleClick = () => history.push('/')
  return (
    <div onClick={handleClick} className="logo-wrapper">INSTAGRAM</div>
  )
}

export default Logo;