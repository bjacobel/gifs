import React, { Component } from 'react';
import { connect } from 'react-redux';
import Infinite from 'react-infinite';

import GifWrapper from './GifWrapper';
import { getGifsAsync } from '../actions/gifs';
import { getTagsAsync } from '../actions/tags';

const mapStateToProps = (state) => {
  const { gifs, tags } = state;
  return { gifs, tags };
};

const mapDispatchToProps = {
  getGifsAsync,
  getTagsAsync
};

class GifColumn extends Component {
  componentDidMount() {
    /* eslint-disable no-shadow */
    const {
      getGifsAsync,
      getTagsAsync
    } = this.props;
    /* eslint-enable no-shadow */

    getGifsAsync();
    getTagsAsync();
  }

  render() {
    const { gifs, tags } = this.props;

    return (
      <Infinite
        className="gif-column"
        useWindowAsScrollContainer
        elementHeight={ 320 }
        preloadAdditionalHeight={ Infinite.containerHeightScaleFactor(4) }
      >
        { gifs.map((gif) => {
          return (
            <div className="gif" key={ gif.id }>
              <GifWrapper gif={ gif } tags={ tags[gif.id] || [] }/>
            </div>
          );
        }) }
      </Infinite>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifColumn);
