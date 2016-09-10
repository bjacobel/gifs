import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage';

import './stylesheets';
import Main from './components/Main';
import reducer from './reducers';
import { SHOW_DEV_TOOLS } from './constants';

const middlewares = [
  applyMiddleware(thunk),
  persistState('auth')
];

if (SHOW_DEV_TOOLS) {
  middlewares.push(window.devToolsExtension ? window.devToolsExtension() : f => f);
}

const composedCreateStore = compose.apply(this, middlewares)(createStore);

const store = composedCreateStore(reducer);

ReactDOM.render(
  <Provider store={ store }>
    <Main />
  </Provider>,
  document.getElementById('main')
);
