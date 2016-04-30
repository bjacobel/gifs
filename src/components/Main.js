import React, { Component } from 'react';

import GifColumn from './GifColumn';
// import SearchBox from './SearchBox';
import TagBox from './TagBox';

export default class Main extends Component {
  render() {
    return (
      <div className="column-container">
        {/* <div className="column search"><SearchBox /></div> */}
        <div className="column gifs">
          <GifColumn />
        </div>
        <div className="column tags">
          <TagBox />
        </div>
      </div>
    );
  }
}
