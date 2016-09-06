import React, { Component } from 'react';

import GifColumn from './GifColumn';
import SearchBox from './SearchBox';
import LoginButton from './LoginButton';
import TagBox from './TagBox';
import Router from './Router';

export default class Main extends Component {
  render() {
    return (
      <div>
        <Router />
        <div className="column-container">
          <div className="column gifs">
            <GifColumn />
          </div>
          <div className="column info">
            <div className="info-liner">
              <SearchBox />
              <TagBox />
            </div>
          </div>
        </div>
        <LoginButton />
      </div>
    );
  }
}
