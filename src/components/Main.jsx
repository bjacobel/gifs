import React, { Component } from 'react';

import GifGrid from './GifGrid';
import Pagination from './Pagination';

export default class Main extends Component {
  render() {
    return (
      <div>
        <div className="pre-footer">
          <Pagination/>
          <GifGrid/>
        </div>
        <Pagination/>
      </div>
    );
  }
}
