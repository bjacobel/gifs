import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Gif extends Component {
  componentWillMount() {
    const { watchForSize, id, name, image } = this.props;

    this.state = {
      loaded: false,
      loading: false
    };

    this.onImageLoad = () => {
      this.setState({
        loaded: true,
        loading: false
      });
      image.removeEventListener('load', this.onImageLoad);
    };
    this.startLoad = () => {
      this.state = Object.assign({}, this.state, { loading: true });
    };

    watchForSize(image, id, name, document.querySelector('.column.gifs').scrollWidth);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.image.src.startsWith('https://gifs.')) {
      if (nextProps.image.complete) {
        this.onImageLoad();
      } else {
        nextProps.image.addEventListener('load', this.onImageLoad);
      }
    }
  }

  render() {
    const { image } = this.props;
    const { loaded, loading } = this.state;
    return (
      <div>
        <div className={ classnames('loading-indicator', { loaded, loading }) } >
          <div className="spinner" />
        </div>
        <img src={ image.src } role="presentation" onMouseOver={ this.startLoad } />
      </div>
    );
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
