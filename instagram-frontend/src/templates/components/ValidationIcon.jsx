import React from 'react';
import PropTypes from 'prop-types';

const validationIcon = ({ valid, changed }) => {
  return (
    changed ? !valid ? <div>Not valid</div> : <div>VALID</div> : null
  )
}

validationIcon.propTypes = {
  valid: PropTypes.bool.isRequired,
  changed: PropTypes.bool.isRequired,
}
export default validationIcon;