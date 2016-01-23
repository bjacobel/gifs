import React, { Component, PropTypes } from 'react';

export default class Gif extends Component {
  // @TODO: handle .gifv, .webm, .mp4 (<video> tag)
  // also would be cool if it could not animate until mouseover
  // will probably require a lambda and imagemagick or pillow

  componentWillMount() {
    const { gif } = this.props;

    this.img = new Image();
    this.img.src = `https://gifs.bjacobel.com/${gif.src}`;
    this.img.addEventListener('load', () => {
      const canvas = document.getElementById(`canvas-${gif.id}`);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(this.img, 0, 0);
    }, false);
  }

  render() {
    const { gif } = this.props;

    const showGif = () => {

    };

    const showCanvas = () => {

    };

    return (
      <div onMouseEnter={ showGif() } onMouseLeave={ showCanvas() }>
        <canvas id={ `canvas-${ gif.id }` } />
        <img src={ `https://gifs.bjacobel.com/${gif.src}` } />
      </div>
    );
  }
}

Gif.propTypes = {
  gif: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired
};
