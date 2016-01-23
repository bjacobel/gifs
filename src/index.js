import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage';
import { Router, Route } from 'react-router';
import { syncHistory } from 'redux-simple-router';
import createHistory from 'history/lib/createHashHistory';

import './stylesheets';
import Main from './components/Main';
import DevTools from './components/DevTools';
import reducer from './reducers';

const history = createHistory();
const reduxRouterMiddleware = syncHistory(history);

const composedCreateStore = compose(
  applyMiddleware(thunk),
  applyMiddleware(reduxRouterMiddleware),
  persistState('gifs', 'routing'),
  DevTools ? DevTools.instrument() : null
)(createStore);

const store = composedCreateStore(reducer);

reduxRouterMiddleware.listenForReplays(store);

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <Router history={ history }>
        <Route path="/" component={ Main }/>
      </Router>
      { DevTools ? <DevTools/> : null }
    </div>
  </Provider>,
  document.getElementById('main')
);
