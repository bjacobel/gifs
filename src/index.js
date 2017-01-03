import 'core-js/es6/promise';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage';
import { createStore, applyMiddleware, compose } from 'redux';

import './stylesheets/index.css';
import Main from './components/Routes';
import reducer from './reducers';
import { SHOW_DEV_TOOLS } from './constants';

const composeEnhancers = (SHOW_DEV_TOOLS && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // eslint-disable-line max-len, no-underscore-dangle

const store = createStore(reducer, {}, composeEnhancers(
  applyMiddleware(...[thunk]),
  persistState('auth', {
    slicer: () => {
      return (state) => {
        const { idToken, idTokenExpiry } = state.auth;
        return { auth: { idToken, idTokenExpiry } };
      };
    },
  }),
));

const render = () => {
  ReactDOM.render(
    <Provider store={ store }>
      <Main />
    </Provider>,
    document.getElementById('main'),
  );
};

if (module.hot) {
  module.hot.accept('./components/Routes', () => {
    render();
  });
}

render();
