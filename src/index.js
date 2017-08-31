import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import Game from './game/game';

import registerServiceWorker from './registerServiceWorker';

import store from './redux/store';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Game} />
      <Route path='/admin' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
