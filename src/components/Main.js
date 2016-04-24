import React, { Component } from 'react';

import GifColumn from './GifColumn';
import SearchBox from './SearchBox';
import TagBox from './TagBox';

export default class Main extends Component {
  render() {
    return (
      <div>
        <SearchBox />
        <GifColumn />
        <TagBox />
      </div>
    );
  }
}
