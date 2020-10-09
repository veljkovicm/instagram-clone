import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import localForage from 'localforage';

// setup store with reducers prepared from pages config
export default (reducers) => {
  const args = [ combineReducers(reducers) ];
  console.log('>> args', args);
  const middleware = [ thunk ];


  // if (DEVELOPMENT) {
    const { composeWithDevTools } = require('redux-devtools-extension');
    const { logger } = require('redux-logger');

    // middleware.push(logger);
    args.push(composeWithDevTools(applyMiddleware(...middleware)));

    // Make localForage available in browser console.
    // Helps to investigate or drop data from local storage
    // window.localForage = localForage;
  // } else {
  //   args.push(applyMiddleware(...middleware));
  // }

  const store = createStore(...args);

  // if (DEVELOPMENT) {
  //   // make store available in browser console
    window.store = store.getState;
  // }

  return store;
}


// remove thunk and forage?