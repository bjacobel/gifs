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
    const { tags } = this.props;

    return (
      <div className="gif" key={ gif.id }>
        <GifWrapper gif={ gif } tags={ tags[gif.id] || [] } />
      </div>
    );
  }

  render() {
    const { gifs } = this.props;

    return (
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
