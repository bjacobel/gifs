import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Gif from './Gif';
import {
  ROOT_URL,
  THUMB_URL,
} from '../constants';
import { watchForSize } from '../actions/gifs';
import {
  animateGif,
  freezeGif,
  saveMostRecentAnimation,
} from '../actions/animation';

function mapStateToProps(state) {
  return {
    animation: state.animation,
  };
}

const mapDispatchToProps = {
  animateGif,
  freezeGif,
  saveMostRecentAnimation,
  watchForSize,
};

class GifWrapper extends Component {
  shouldComponentUpdate(nextProps) {
    // Only update if animation[this.id] changes

    const { animation, gif } = this.props;

    if (gif.id in nextProps.animation) {
      if (gif.id in animation) {
        return animation[gif.id] !== nextProps.animation[gif.id];
      }
      return true;
    }

    return false;
  }

  render() {
    const {
      gif,
      animation,
      /* eslint-disable no-shadow */
      animateGif,
      freezeGif,
      saveMostRecentAnimation,
      watchForSize,
      /* eslint-enable no-shadow */
    } = this.props;

    const enabled = animation[gif.id] || false;
    const gifURL = enabled ? `${ROOT_URL}${gif.src}` : `${THUMB_URL}${gif.src}`;
    const image = new Image();
    image.src = gifURL;

    const enableMotion = () => {
      animateGif(gif.id);
      saveMostRecentAnimation(gif.id);
    };
    const disableMotion = () => { freezeGif(gif.id); };
    const toggleMotion = () => {
      if (enabled) {
        disableMotion();
      } else {
        enableMotion();
      }
    };

    return (
      <div
        className="gif-wrapper"
        onMouseOver={ enableMotion }
        onMouseOut={ disableMotion }
        onTouchEnd={ toggleMotion }
      >
        <Gif
          image={ image }
          watchForSize={ watchForSize }
          id={ gif.id }
          name={ gif.src }
        />
      </div>
    );
  }
}

GifWrapper.propTypes = {
  gif: PropTypes.shape({
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GifWrapper);
