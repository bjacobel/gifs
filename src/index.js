import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import './stylesheets';
import Main from './components/Main';
import reducer from './reducers';

let DevTools;

if (process.env.NODE_ENV !== 'production') {
  DevTools = createDevTools(
    <DockMonitor
      toggleVisibilityKey="ctrl-h"
      changePositionKey="ctrl-j"
      defaultIsVisible={ false }
    >
      <LogMonitor theme="tomorrow" />
    </DockMonitor>
  );
}

const composedCreateStore = compose(
  applyMiddleware(thunk),
  DevTools.instrument()
)(createStore);

const store = composedCreateStore(reducer);

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <div>
        <Main />
        <DevTools />
      </div>
    </Provider>
  </div>,
  document.getElementById('main')
);
