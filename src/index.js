import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from './redux/store';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
