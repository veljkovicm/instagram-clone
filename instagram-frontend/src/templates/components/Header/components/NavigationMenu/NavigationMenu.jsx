import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';


import './navigationBar.css';

const NavigationBar = (props) => {
  const {
    username,
    clearUser,
    path,
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
    setMenuActive(false);
    history.push(`${path}`);
    window.location.reload();
  }

  const handleLogout = () => {
    clearUser();
    history.push('/');
  }



  return (
    <div className="navigation-menu__wrapper">
      <div className="navigation-menu">
        <div className={`navigation-menu__item feed ${path === '/feed' && 'active'}`} onClick={() => handleNavClick('/feed')} title="Home"></div>
        <div className="navigation-menu__item direct" onClick={() => handleNavClick('/direct')} title="Direct"></div>
        <div className="navigation-menu__item explore" onClick={() => handleNavClick('/explore')} title="Explore"></div>
        <div className="navigation-menu__item notifications" onClick={() => handleMenuClick('notifications')}>
          {
            menuActive === 'notifications' &&
            <div>
              USER NOTIFICATIONS
            </div>
          }
        </div>
        <div className={`navigation-menu__item ${menuActive || path === '/u/' + username ? 'active' : ''}`} onClick={() => handleMenuClick('user')}>
          {menuActive === 'user' &&
          <div className="navigation-menu__dropdown user">
            <div className="navigation-menu__dropdown-item"  onClick={() => handleNavClick(`/u/${username}`)}>Profile</div>
            <div className="navigation-menu__dropdown-item"  onClick={() => handleNavClick('/settings')}>Settings</div>
            <div className="navigation-menu__dropdown-item"  onClick={handleLogout}>Log Out</div>
          </div> }
        </div>
      </div>
    </div>
  )
}

NavigationBar.propTypes = {
  username: PropTypes.string,
  clearUser: PropTypes.func.isRequired,
  path: PropTypes.string,
}

export default NavigationBar;
