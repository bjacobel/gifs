import React, { Component } from 'react';

import GifColumn from './GifColumn';

export default class Main extends Component {
  render() {
    return (
      <div>
        {/*<SearchBox/>*/}
        <GifColumn />
        <TagBox />
      </div>
    );
  }
}
