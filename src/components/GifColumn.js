import React, { Component } from 'react';
import { connect } from 'react-redux';

import GifWrapper from './GifWrapper';
import { getGifsAsync, updateVisibleGifs } from '../actions/gifs';

const mapStateToProps = (state) => {
  return {
    gifs: state.gifs,
    searchResults: state.searchResults,
    tags: state.tags,
    visible: state.visible,
  };
};

const mapDispatchToProps = {
  getGifsAsync,
  updateVisibleGifs,
};

class GifColumn extends Component {
  componentDidMount() {
    const {
      /* eslint-disable no-shadow */
      updateVisibleGifs,
      getGifsAsync,
      /* eslint-enable no-shadow */
    } = this.props;

    getGifsAsync();
    updateVisibleGifs();

    this.renderGif = this.renderGif.bind(this);

    const onScroll = () => {
      updateVisibleGifs(this.props.gifs);
    };

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        onScroll();
      });
    });
  }

  renderGif(gif, index) {
    const { start, end } = this.props.visible;

    let spacerOrGif;

    if (start <= index && index <= end) {
      spacerOrGif = <GifWrapper gif={ gif } />;
    } else {
      spacerOrGif = <div className="spacer" style={ { height: gif.observedHeight } } />;
    }

    return (
      <div className="gif" key={ gif.id + gif.src }>
        { spacerOrGif }
      </div>
    );
  }

  render() {
    const { gifs, searchResults } = this.props;
    let filteredGifs = gifs;

    if (searchResults.length > 0) {
      filteredGifs = searchResults.map((result) => {
        return gifs.find(gif => result === gif.id);
      });
    }

    return (
      <div className="gif-column">
        { filteredGifs.map((gif, index) => this.renderGif(gif, index)) }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GifColumn);
