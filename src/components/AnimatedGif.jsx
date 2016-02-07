import React, { Component, PropTypes } from 'react';

export default class AnimatedGif extends Component {
  render() {
    const { img } = this.props;

    return <img src={ img.src }/>;
  }
}

AnimatedGif.propTypes = {
  img: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired
};
