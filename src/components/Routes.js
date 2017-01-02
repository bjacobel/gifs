import React, { Component } from 'react';
import { Match, Miss, BrowserRouter } from 'react-router';

import Main from './Main';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match pattern="/" exactly component={ Main } />
          <Match pattern="/search/:search" component={ Main } />
          <Miss component={ Main } />
        </div>
      </BrowserRouter>
    );
  }
}
