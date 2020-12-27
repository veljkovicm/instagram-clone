import React from 'react';
import PropTypes from 'prop-types';

import './validationIcon.scss';

const ValidationIcon = ({ valid, changed }) => {
  return (
    changed ? <div className={`validation-icon ${valid ? 'input-valid' : 'input-invalid'}`} /> : null
  )
}

ValidationIcon.propTypes = {
  valid: PropTypes.bool.isRequired,
  changed: PropTypes.bool.isRequired,
}

export default ValidationIcon;
