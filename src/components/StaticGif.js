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
    const { img, id, watchForSize } = this.props;

    const canvas = this.refs[id];
    const ctx = canvas.getContext('2d');
    const column = document.querySelector('.column.gifs');

    watchForSize(img, id, column.scrollWidth);

    // When image has fully loaded, remove the loading spinner and fade it in
    img.addEventListener('load', () => {
      canvas.classList.remove('loading');
      const scale = img.width / canvas.width;
      canvas.height = img.height / scale;  // eslint-disable-line no-param-reassign

      let opacity = 0;
      const fadeIn = () => {
        ctx.globalAlpha = opacity;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        opacity += 0.05;
        if (opacity < 1) {
          requestAnimationFrame(fadeIn);
        }
      };
      fadeIn();
    }, false);
  }

  render() {
    return <canvas className="loading" ref={ `${this.props.id}` } />;
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
