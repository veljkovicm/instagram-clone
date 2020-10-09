import React from 'react';
import PropTypes from 'prop-types';


const PageNotFound = (props) => {
  const { path } = props;
  const content = (
    <div className="page-not-found">404 Not found</div>
  );

  return (

    // Add base template component e.g
    // <BaseTemplate
    //   content={content}
    //   path={path}
    // />
    {content}
  );
};

PageNotFound.propTypes = {
  path: PropTypes.string,
};

export default PageNotFound;
