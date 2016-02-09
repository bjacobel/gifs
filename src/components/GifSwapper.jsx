import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import StaticGif from './StaticGif';
import AnimatedGif from './AnimatedGif';
import { rootURL } from '../constants';
import * as clipboard from '../services/clipboard';
import { animateGif, freezeGif } from '../actions/animation';

function mapStateToProps(state) {
  return {
    animation: state.animation
  };
}

const mapDispatchToProps = {
  animateGif,
  freezeGif
};

export default class GifSwapper extends Component {
  render() {
    const { gif, animateGif, freezeGif, animation } = this.props;  // eslint-disable-line no-shadow
    const enabled = animation[gif.id] || false;

    const img = new Image();
    img.src = rootURL + gif.src;

    const enableMotion = () => { animateGif(gif.id); };
    const disableMotion = () => { freezeGif(gif.id); };
    const clip = () => { clipboard.copy(rootURL + gif.src); };
    const disableAndClip = () => { disableMotion(); clip(); };

    return (
      <div
        onMouseOver={ enableMotion }
        onMouseOut={ disableMotion }
        onTouchStart={ enableMotion }
        onTouchEnd={ disableAndClip }
        onMouseUp={ clip }
        className={ classNames('gif-swapper', { enabled }) }
      >
        <AnimatedGif img={ img }/>
        <StaticGif img={ img } id={ gif.id }/>
      </div>
    );
  }
}

GifSwapper.propTypes = {
  gif: PropTypes.shape({
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifSwapper);
