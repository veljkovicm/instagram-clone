import PropTypes from 'prop-types';

export const userObjectPropTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string,
};

export const userPropType = PropTypes.shape(userObjectPropTypes);
