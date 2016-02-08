import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import StaticGif from './StaticGif';
import AnimatedGif from './AnimatedGif';
import { rootURL } from '../constants';
import * as clipboard from '../services/clipboard';

export default class GifSwapper extends Component {
  constructor() {
    super();
    this.state = { enabled: false };  // @TODO: Move this into Redux
  }

  render() {
    const { gif, packerize } = this.props;

    const img = new Image();
    img.src = rootURL + gif.src;

    const enableMotion = () => { this.setState({ enabled: true }); };
    const disableMotion = () => { this.setState({ enabled: false }); };
    const clip = () => { clipboard.copy(rootURL + gif.src); };
    const disableAndClip = () => { disableMotion(); clip(); };

    return (
      <div
        onMouseOver={ enableMotion }
        onMouseOut={ disableMotion }
        onTouchStart={ enableMotion }
        onTouchEnd={ disableAndClip }
        onMouseUp={ clip }
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
