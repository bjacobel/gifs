import React, { Component, PropTypes } from 'react';

export default class StaticGif extends Component {
  componentDidMount() {
    const { img, id } = this.props;
    const canvas = this.refs[`canvas-${id}`];
    const ctx = canvas.getContext('2d');

    const interval = window.setInterval(() => {
      if (img.height > 0) {
        canvas.height = img.height * (canvas.width / img.width);
        window.clearInterval(interval);
      }
    }, 10);

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

    return (
      <canvas className="loading" ref={ `canvas-${id}` } />
    );
  }
}

StaticGif.propTypes = {
  img: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired
};
