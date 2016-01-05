import React, { Component, PropTypes } from 'react';

export default class Gif extends Component {
  // @TODO: handle .gifv, .webm, .mp4 (<video> tag)
  // also would be cool if it could not animate until mouseover
  // will probably require a lambda and https://github.com/aheckmann/gm

  render() {
    const { gif } = this.props;

    return <img src={ `http://gifs.bjacobel.com/${gif.src}` } />;
  }
}

Gif.propTypes = {
  gif: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired
};
