import React from 'react';
import PropTypes from 'prop-types';
import { Post } from 'components';

import './postPopup.scss';

const PostPopup = (props) => {
  const {
    post,
    setShowPopup,
    username,
  } = props;

  const closePopup = () => {
    setShowPopup(false);
    window.history.replaceState(null, `Profile - ${username}`, `/u/${username}`);
  }

  return (
    <div>
      <div className="user-list__backdrop" onClick={closePopup} />
      <div className="post-popup">
        <Post type="single" post={post} />
      </div>
    </div>
  )
}

PostPopup.propTypes = {
  post: PropTypes.object.isRequired,
  setShowPopup: PropTypes.func.isRequired,
  username: PropTypes.string,
}

export default PostPopup;
