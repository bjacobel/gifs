import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Gif extends Component {
  componentWillMount() {
    const { gif } = this.props;

    this.setState({ enabled: false });

    this.img = new Image();
    this.img.src = `https://gifs.bjacobel.com/${gif.src}`;

    this.img.addEventListener('load', () => {
      const canvas = document.getElementById(`canvas-${gif.id}`);
      const ctx = canvas.getContext('2d');

      const colWidth = document.getElementById('grid-sizer').scrollWidth;
      const scale = this.img.width / colWidth;

      canvas.width = colWidth;
      canvas.height = this.img.height / scale;

      ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
    }, false);
  }

  render() {
    const { gif } = this.props;

    const enableMotion = () => { this.setState({ enabled: true }); };
    const disableMotion = () => { this.setState({ enabled: false }); };

    return (
      <div
        onMouseOver={ enableMotion }
        onMouseOut={ disableMotion }
        className={ classNames('gif-wrapper', { enabled: this.state.enabled }) }
      >
        <canvas id={ `canvas-${ gif.id }` } />
        <img src={ `https://gifs.bjacobel.com/${gif.src}` } />
      </div>
    );
  }
}

Gif.propTypes = {
  gif: PropTypes.shape({
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }).isRequired
};
