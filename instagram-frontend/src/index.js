import React from 'react';
import ReactDOM from 'react-dom';

import App from './core';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    {React.createElement(App)}
  </React.StrictMode>,
  document.getElementById('root')
  );


serviceWorker.unregister();
