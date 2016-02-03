import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage';
import { Router, Route } from 'react-router';
import { syncHistory } from 'react-router-redux';
import createHistory from 'history/lib/createHashHistory';

import './stylesheets';
import Main from './components/Main';
import Err from './components/Err';
import DevTools from './components/DevTools';
import reducer from './reducers';

const history = createHistory();
const reduxRouterMiddleware = syncHistory(history);

const composedCreateStore = compose(
  applyMiddleware(thunk),
  applyMiddleware(reduxRouterMiddleware),
  persistState('routing'),
  DevTools && DevTools.instrument()
)(createStore);

const store = composedCreateStore(reducer);

reduxRouterMiddleware.listenForReplays(store);

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <Router history={ history }>
        <Route path="/" component={ Main }/>
        <Route path="/error" component={ Err }/>
      </Router>
      { DevTools ? <DevTools/> : null }
    </div>
  </Provider>,
  document.getElementById('main')
);
