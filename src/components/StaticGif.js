import React, { Component, PropTypes } from 'react';

export default class StaticGif extends Component {
  componentDidMount() {
    const { img } = this.props;
    const canvas = this.refs[`canvas-${img.id}`];
    const ctx = canvas.getContext('2d');

    img.addEventListener('load', () => {
      const scale = img.width / canvas.width;
      canvas.height = img.height / scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }, false);
  }

  render() {
    const { img } = this.props;

    return (
      <canvas ref={ `canvas-${img.id}` } />
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
