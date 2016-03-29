import React, { Component } from 'react';
import { connect } from 'react-redux';

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

class GifGrid extends Component {
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
      <div className="gif-grid">
        { gifs.map((gif) => {
          return (
            <div className="gif" key={ gif.id }>
              <GifWrapper gif={ gif } tags={ tags[gif.id] || [] }/>
            </div>
          );
        }) }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifGrid);
