import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import StaticGif from './StaticGif';
import AnimatedGif from './AnimatedGif';
import { rootURL } from '../constants';

export default class GifSwapper extends Component {
  constructor() {
    super();
    this.state = { enabled: false };  // @TODO: Move this into Redux
  }

  componentWillMount() {
    const { gif } = this.props;

    const handler = (e) => {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', rootURL + gif.src);
      }
    };

    this.copyToClipboard = () => {
      document.addEventListener('copy', handler);
      document.execCommand('copy');
      document.removeEventListener('copy', handler);
    };
  }

  render() {
    const { gif, packerize } = this.props;

    const img = new Image();
    img.src = rootURL + gif.src;

    const enableMotion = () => { this.setState({ enabled: true }); };
    const disableMotion = () => { this.setState({ enabled: false }); };
    const clipboard = () => { this.copyToClipboard(); };
    const disableAndClip = () => { disableMotion(); clipboard(); };

    return (
      <div
        onMouseOver={ enableMotion }
        onMouseOut={ disableMotion }
        onTouchStart={ enableMotion }
        onTouchEnd={ disableAndClip }
        onMouseUp={ clipboard }
        className={ classNames('gif-swapper', { enabled: this.state.enabled }) }
      >
        <AnimatedGif img={ img }/>
        <StaticGif img={ img } id={ gif.id } packerize={ packerize }/>
      </div>
    );
  }
}

GifSwapper.propTypes = {
  gif: PropTypes.shape({
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }).isRequired,
  packerize: PropTypes.func.isRequired
};
