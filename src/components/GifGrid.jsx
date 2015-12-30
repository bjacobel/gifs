import React, { Component, PropTypes } from 'react';

import Gif from './Gif';

class GifGrid extends Component {
  // @TODO: Lazy loading, for now just murder the bowser by trying to load everything

  render() {
    const { gifs } = this.props;

    return (
      <div className="flex-container">
        { gifs.map((gif) => {
          return (
            <div className="flex-child" key={ gif.id }>
              <Gif gif={ gif } />
            </div>
          );
        }) }
      </div>
    );
  }
}

GifGrid.propTypes = {
  gifs: PropTypes.array.isRequired
};
