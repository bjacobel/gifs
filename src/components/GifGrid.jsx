import React, { Component, PropTypes } from 'react';

import GifWrapper from './GifWrapper';

export default class GifGrid extends Component {
  // @TODO: Lazy loading, for now just murder the bowser by trying to load everything

  render() {
    const { gifs, tags } = this.props;

    const byTimestamp = (a, b) => {
      return a.date < b.date;
    };

    return (
      <div id="gif-grid">
        <div className="grid-sizer" />
        <div className="gutter-sizer" />
        { gifs.sort(byTimestamp).map((gif) => {
          return (
            <div className="packery-item" key={ gif.id }>
              <GifWrapper gif={ gif } tags={ tags[gif.id] || [] }/>
            </div>
          );
        }) }
      </div>
    );
  }
}

GifGrid.propTypes = {
  gifs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  tags: PropTypes.shape().isRequired
};
