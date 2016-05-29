import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InfiniteLoader, VirtualScroll } from 'react-virtualized';

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

    this.renderGif = this.renderGif.bind(this);
  }

  renderGif(gif) {
    const { gifs, tags } = this.props;

    // const gif = gifs[index];
    const myTags = tags[gif.id] || [];

    return (
      <div className="gif" key={ gif.id + gif.src }>
        <GifWrapper gif={ gif } tags={ myTags } />
      </div>
    );
  }

  render() {
    const { gifs } = this.props;

    return (
        // <VirtualScroll
        //   rowRenderer={ this.renderGif }
        //   rowCount={ gifs.length }
        //   className="gif-column"
        //   overscanRowCount="10"
        //   width="100%"
        //   height="100vh"
        // />
        <div className="gif-column">
          { gifs.slice(0, 20).map(this.renderGif) }
        </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifColumn);
