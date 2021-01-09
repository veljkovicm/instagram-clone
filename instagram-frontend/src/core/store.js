import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';

// setup store with reducers prepared from pages config
export default (reducers) => {
  const args = [ combineReducers(reducers) ];

  const middleware = [ thunk ];


  if (process.env.development) {
    const { composeWithDevTools } = require('redux-devtools-extension');
    args.push(composeWithDevTools(applyMiddleware(...middleware)));
  } else {
    args.push(applyMiddleware(...middleware));
  }

  const store = createStore(...args);

  if (process.env.development) {
    window.store = store.getState;
  }

  return store;
}