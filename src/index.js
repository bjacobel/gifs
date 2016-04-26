import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import './stylesheets';
import Main from './components/Main';
import DevTools from './components/DevTools';
import reducer from './reducers';
import { showDevTools } from './constants';

const middlewares = [
  applyMiddleware(thunk)
];

if (showDevTools) { middlewares.push(DevTools.instrument()); }

const composedCreateStore = compose.apply(this, middlewares)(createStore);

const store = composedCreateStore(reducer);

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <Main />
      { showDevTools ? <DevTools /> : null }
    </div>
  </Provider>,
  document.getElementById('main')
);
