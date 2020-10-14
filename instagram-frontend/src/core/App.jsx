import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { checkUser } from './user/actions.js';

import setupStore from './store.js';
import globalReducer from './reducer.js';

import pagesConfig from '../scenes';

import {
  // LoadingBar,
  ProtectedRoute,
  PageNotFound
} from './components';                      

import './app.css';

const signInPath = '/sign_in';
const defaultPath = '/feed';



// prepare reducers for redux store
function prepareReducers (config) {
  const reducers = { global: globalReducer };

  for (const page in config) {
    const reducer = config[page].reducer;
    if (reducer) {
      reducers[page] = reducer;
    }
  }
  return reducers;
}





// prepare routes for application
function renderRoutes (routesConfig) {
  const routes = [];

  for (const page in routesConfig) {
    const config = routesConfig[page];

    const routeProps = {
      key: config.path,
      path: config.path,
      component: (props) => (
        <config.component
          {...props}
        />
      ),
    };

    if (config.protected) {
      routes.push(<ProtectedRoute redirectTo={signInPath} {...routeProps} />);
    } else {
      routes.push(<Route {...routeProps} />);
    }
  }

  return routes;
}


// Prepare store one time
const reducers = prepareReducers(pagesConfig);
const store = setupStore(reducers);

const App = () => {

  // use loading component for this; In base template?
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    store.dispatch(checkUser());
    setLoading(false);
  }, [])

  // LoadingBar.init();
  const routes = renderRoutes(pagesConfig);


  const pageNotFoundComponent = () => (
    <PageNotFound path={defaultPath} />
  );
  return (
    loading ? <p>loading</p> :
    <Provider store={store}>
      <Router>
        <Switch>
          {routes}
          <Redirect exact from="/" to='/feed' />
          {/* <ProtectedRoute component={pageNotFoundComponent} redirectTo={signInPath} /> */}
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    </Provider>
  );
}


export default App;