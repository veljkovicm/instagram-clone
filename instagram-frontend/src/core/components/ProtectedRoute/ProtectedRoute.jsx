import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = (props) => {
  const {
    component: RouteComponent,
    redirectTo,
    isLoggedIn,
    checkUser,
    ...rest
  } = props;

  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    checkUser();
    setLoading(false);
  }, [])

  return (
    loading ? <p>LOADING THIS....</p> : // add spinner
    <Route
      {...rest}
      render={(routeProps) => (isLoggedIn ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to={redirectTo} />
      ))}
    />
  );
};

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  /** Url to redirect to when not authorized to access this route */
  redirectTo: PropTypes.string,
  /**
   *  React component passed to the Route
   */
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
  /**
   * Check is we have a valid user
   */
  checkUser: PropTypes.func,
};

export default ProtectedRoute;
