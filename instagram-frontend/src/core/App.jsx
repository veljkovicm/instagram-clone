import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { checkUser } from './user/actions';
import { Loading } from 'components';
import setupStore from './store';
import globalReducer from './reducer';
import pagesConfig from '../scenes';
import { ProtectedRoute } from './components';

import './app.scss';

const signInPath = '/sign_in';

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
      title: config.title,
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
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    store.dispatch(checkUser())
    .then(() => {
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    }) ;
  }, [])

  const routes = renderRoutes(pagesConfig);

  return (
    loading ? <Loading /> :
    <Provider store={store}>
      <Router>
        <Switch>
          {routes}
          <Route path="/sign_in" {...pagesConfig.auth}/>
          <Redirect exact from="/" to='/feed' />
          {/* <ProtectedRoute component={pageNotFoundComponent} redirectTo={signInPath} /> */}
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </Provider>
  );
}


export default App;