import React, { Component, PropTypes } from 'react';

export default class Gif extends Component {
  componentWillMount() {
    const { watchForSize, id, name, image } = this.props;

    watchForSize(image, id, name, document.querySelector('.column.gifs').scrollWidth);
  }

  render() {
    const { image } = this.props;
    return <img src={ image.src } role="presentation" />;
  }
}

Gif.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  watchForSize: PropTypes.func.isRequired
};
