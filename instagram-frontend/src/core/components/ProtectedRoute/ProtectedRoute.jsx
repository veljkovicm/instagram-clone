import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const ProtectedRoute = (props) => {
  const {
    component: RouteComponent,
    redirectTo,
    isLoggedIn,
    checkUser,
    loading,
    stopLoading,
    title,
    ...rest
  } = props;
  console.log('1 props', props);
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      { title ? <Helmet><title>{`Instagram - ${title}`}</title></Helmet> : null }
      { loading ? <p>LOADING THIS....</p> : // add spinner
        <Route
          {...rest}
          render={(routeProps) => (isLoggedIn ? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to={redirectTo} />
          ))}
        />
      }
    </>
  );
};

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  redirectTo: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
  checkUser: PropTypes.func,
  loading: PropTypes.bool,
  stopLoading: PropTypes.func,
  title: PropTypes.string,
};

export default ProtectedRoute;
