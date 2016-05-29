import React, { Component } from 'react';
import { connect } from 'react-redux';

import GifWrapper from './GifWrapper';
import { getGifsAsync, updateVisibleGifs } from '../actions/gifs';

const mapStateToProps = (state) => {
  return {
    gifs: state.gifs,
    tags: state.tags,
    visible: state.visible
  };
};

const mapDispatchToProps = {
  getGifsAsync,
  updateVisibleGifs
};

class GifColumn extends Component {
  componentDidMount() {
    const {
      updateVisibleGifs,
      getGifsAsync
    } = this.props;

    getGifsAsync();

    this.renderGifs = this.renderGifs.bind(this);

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

  renderGifs() {
    const gifsToRender = [];
    this.props.gifs.forEach((gif, index) => {
      gifsToRender.push(this.renderGif(gif, index));
    });

    return gifsToRender;
  }

  render() {
    return (
      <div className="gif-column" ref={ this.updateOnScroll }>
        { this.renderGifs() }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifColumn);
