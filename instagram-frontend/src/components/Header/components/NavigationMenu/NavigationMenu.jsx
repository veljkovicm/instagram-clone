import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';


import './navigationBar.scss';

const NavigationBar = (props) => {
  const {
    username,
    clearUser,
    path,
    avatar,
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
    if(window.location.pathname !== path) {
      history.push(`${path}`);
      window.location.reload();
    }
  }

  const handleLogout = () => {
    clearUser();
    history.push('/');
  }

  const avatarSrc = avatar ? `${process.env.REACT_APP_ENV_spacesURL}/avatars/${avatar}` : `${process.env.REACT_APP_ENV_spacesURL}/assets/no-avatar.jpg`;

  return (
    <div className="navigation-menu__wrapper">
      <div className="navigation-menu">
        <div
          className={`navigation-menu__item feed ${path === '/feed' && 'active'}`}
          onClick={() => handleNavClick('/feed')}
          title="Home"
        />
        <div className="navigation-menu__item direct forbidden" title="Direct" />
        <div className="navigation-menu__item explore forbidden" title="Explore" />
        <div
          className={`navigation-menu__item notifications  ${menuActive === 'notifications' ? 'active' : ''}`}
          onClick={() => handleMenuClick('notifications')}
        >
          { menuActive === 'notifications' && (
            <>
              <div className="navigation-menu__dropdown notifications">
                <div className="backdrop" />
                <p>No new notifications</p>
              </div>
            </>
          )}
        </div>
        <div
          className={`navigation-menu__item user-menu ${menuActive === 'user' || path === '/u/' + username ? 'active' : ''}`} 
          onClick={() => handleMenuClick('user')}
          style={{ background: `url(${avatarSrc})` }}
        >
          {
            menuActive === 'user'
              &&
            <div className="navigation-menu__dropdown user">
              <div className="backdrop" />
              <div className="navigation-menu__dropdown-item profile"  onClick={() => handleNavClick(`/u/${username}`)}>Profile</div>
              <div className="navigation-menu__dropdown-item settings"  onClick={() => handleNavClick('/settings')}>Settings</div>
              <div className="navigation-menu__dropdown-item log-out"  onClick={handleLogout}>Log Out</div>
            </div>
          }
        </div>
      </div>
    </div>
  )
};

NavigationBar.propTypes = {
  username: PropTypes.string,
  clearUser: PropTypes.func.isRequired,
  path: PropTypes.string,
  avatar: PropTypes.string,
}

export default NavigationBar;
