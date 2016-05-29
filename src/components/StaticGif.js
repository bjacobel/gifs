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
  componentWillMount() {
    this.onCanvasRender = this.onCanvasRender.bind(this);
  }

  onCanvasRender(canvas) {
    const { img, id } = this.props;
    const ctx = canvas.getContext('2d');

    this.props.watchForSize(img, id);

    // When image has fully loaded, remove the loading spinner and fade it in
    img.addEventListener('load', () => {
      canvas.classList.remove('loading');
      const scale = img.width / canvas.width;
      canvas.height = img.height / scale;  // eslint-disable-line no-param-reassign

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
    return <canvas className="loading" ref={ this.onCanvasRender } />;
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
