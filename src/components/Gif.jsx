import React, { Component, PropTypes } from 'react';

class Gif extends Component {
  // @TODO: handle .gifv, .webm, .mp4 (<video> tag)
  // also would be cool if it could not animate until mouseover

  render() {
    const { gif } = this.props;

    return <img src={ gif.src }/>;
  }
}

Gif.propTypes = {
  gif: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired
};
