import React, { Component, PropTypes } from 'react';

export default class StaticGif extends Component {
  componentDidMount() {
    const { img } = this.props;
    const canvas = this.refs[`canvas-${img.id}`];
    const ctx = canvas.getContext('2d');
    canvas.height = Math.random() * 200 + 150;

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
    const { img } = this.props;

    return (
      <canvas className="loading" ref={ `canvas-${img.id}` } />
    );
  }
}

StaticGif.propTypes = {
  img: PropTypes.shape({
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired
};
