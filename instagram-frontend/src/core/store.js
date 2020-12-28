import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// setup store with reducers prepared from pages config
export default (reducers) => {
  const args = [ combineReducers(reducers) ];

  const middleware = [ thunk ];


  // if (DEVELOPMENT) {
    const { composeWithDevTools } = require('redux-devtools-extension');

    // middleware.push(logger);
    args.push(composeWithDevTools(applyMiddleware(...middleware)));


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