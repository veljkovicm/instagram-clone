import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props) => {
  const { isLoading } = props;

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-container">LOADING</div>
  );
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loading;
