import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import StaticGif from './StaticGif';
import AnimatedGif from './AnimatedGif';
import GifTags from './GifTags';
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

export default class GifWrapper extends Component {
  shouldComponentUpdate(nextProps) {
    // Only update if animation[this.id] changes

    const { animation, gif } = this.props;

    if (nextProps.animation.hasOwnProperty([gif.id])) {
      if (animation.hasOwnProperty([gif.id])) {
        return animation[gif.id] !== nextProps.animation[gif.id];
      }
      return true;
    }

    return false;
  }

  render() {
    const {
      gif,
      tags,
      animation,
      animateGif, // eslint-disable-line no-shadow
      freezeGif // eslint-disable-line no-shadow
    } = this.props;

    const enabled = animation[gif.id] || false;

    const img = new Image();
    img.src = rootURL + gif.src;

    const enableMotion = () => { animateGif(gif.id); };
    const disableMotion = () => { freezeGif(gif.id); };
    const clip = () => { clipboard.copy(rootURL + gif.src); };
    const disableAndClip = () => { disableMotion(); clip(); };

    return (
      <div className="gif-wrapper">
        <div
          onMouseOver={ enableMotion }
          onMouseOut={ disableMotion }
          onTouchStart={ enableMotion }
          onTouchEnd={ disableAndClip }
          onMouseUp={ clip }
          className={ classNames('swapper', { enabled }) }
        >
          <AnimatedGif img={ img }/>
          <StaticGif img={ img } id={ gif.id }/>
        </div>
        <GifTags tags={ tags }/>
      </div>
    );
  }
}

GifWrapper.propTypes = {
  gif: PropTypes.shape({
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }).isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifWrapper);
