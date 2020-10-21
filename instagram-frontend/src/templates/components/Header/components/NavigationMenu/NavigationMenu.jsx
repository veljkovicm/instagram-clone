import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';


import './navigationBar.css';

const NavigationBar = (props) => {
  const {
    username,
    clearUser,
  } = props;
  const [ menuActive, setMenuActive ] = useState();
  const history = useHistory();

  const handleMenuClick = (item) => {
    if(menuActive === item) {
      setMenuActive(null);
    } else {
      setMenuActive(item);
    }
  }
  const handleNavClick = (path) => {
    console.log('>> path', path);
    setMenuActive(false);
    history.push(`${path}`);
  }

  const handleLogout = () => {
    clearUser();
  }



  return (
    <div className="navigation-menu__wrapper">
      <div className="navigation-menu">
        <div className="navigation-menu__item" onClick={() => handleNavClick('/')} title="Home"></div>
        <div className="navigation-menu__item" onClick={() => handleNavClick('/direct')} title="Direct"></div>
        <div className="navigation-menu__item" onClick={() => handleNavClick('/explore')} title="Explore"></div>
        <div className="navigation-menu__item" onClick={() => handleMenuClick('notifications')}>
          {
            menuActive === 'notifications' &&
            <div>
              USER NOTIFICATIONS
            </div>
          }
        </div>
        <div className="navigation-menu__item" onClick={() => handleMenuClick('user')}>
          {menuActive === 'user' &&
          <div className="navigation-menu__dropdown user">
            <div className="navigation-menu__dropdown-item"  onClick={() => handleNavClick(`/u/${username}`)}>Profile</div>
            <div className="navigation-menu__dropdown-item"  onClick={() => handleNavClick(`/u/${username}/saved`)}>Saved</div>
            <div className="navigation-menu__dropdown-item"  onClick={() => handleNavClick('/settings')}>Settings</div>
            <div className="navigation-menu__dropdown-item"  onClick={handleLogout}>Log Out</div>
          </div> }
        </div>
      </div>
    </div>
  )
}


export default NavigationBar;