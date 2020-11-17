import React from 'react';
import PropTypes from 'prop-types';

const ValidationIcon = ({ valid, changed }) => {
  return (
    changed ? !valid ? <div>Not valid</div> : <div>VALID</div> : null
  )
}

ValidationIcon.propTypes = {
  valid: PropTypes.bool.isRequired,
  changed: PropTypes.bool.isRequired,
}

export default ValidationIcon;
