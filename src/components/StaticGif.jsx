import React, { Component, PropTypes } from 'react';

export default class StaticGif extends Component {
  componentDidMount() {
    const { img, packerize } = this.props;
    const canvas = this.refs[`canvas-${img.id}`];
    const ctx = canvas.getContext('2d');

    img.addEventListener('load', () => {
      const colWidth = document.getElementsByClassName('grid-sizer')[0].scrollWidth;
      const scale = img.width / colWidth;

      canvas.width = colWidth;
      canvas.height = img.height / scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      packerize();
    }, false);
  }

  render() {
    const { img } = this.props;

    return (
      <canvas ref={ `canvas-${img.id}` }/>
    );
  }
}

StaticGif.propTypes = {
  img: PropTypes.shape({
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired,
  packerize: PropTypes.func.isRequired
};