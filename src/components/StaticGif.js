import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { watchForSize } from '../actions/gifs';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  watchForSize
};

export default class StaticGif extends Component {
  componentDidMount() {
    const {
      img,
      id,
      watchForSize  // eslint-disable-line no-shadow
    } = this.props;

    const canvas = this.refs[`canvas-${id}`];
    const ctx = canvas.getContext('2d');

    watchForSize(img, id);

    // When image has fully loaded, remove the loading spinner and fade it in
    img.addEventListener('load', () => {
      canvas.classList.remove('loading');
      const scale = img.width / canvas.width;
      canvas.height = img.height / scale;

      let opacity = 0;
      const fadeIn = () => {
        ctx.globalAlpha = opacity;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        opacity += 0.02;
        if (opacity < 1) {
          requestAnimationFrame(fadeIn);
        }
      };
      fadeIn();
    }, false);
  }

  render() {
    const { id } = this.props;
    const canvas = <canvas className="loading" ref={ `canvas-${id}` } />;

    return canvas;
  }
}

StaticGif.propTypes = {
  img: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaticGif);
