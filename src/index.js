import 'core-js/fn/object/assign';
import 'core-js/fn/object/keys';
import 'core-js/es6/promise';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import './stylesheets/index.css';
import Main from './components/Main';
import reducer from './reducers';
import { SHOW_DEV_TOOLS } from './constants';

const composeEnhancers = (SHOW_DEV_TOOLS && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // eslint-disable-line max-len, no-underscore-dangle

const store = createStore(reducer, {}, composeEnhancers(
  applyMiddleware(...[thunk]),
));

ReactDOM.render(
  <Provider store={ store }>
    <Main />
  </Provider>,
  document.getElementById('main'),
);
