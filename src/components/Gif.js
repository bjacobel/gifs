import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Gif extends Component {
  constructor() {
    super();
    this.startLoad = this.startLoad.bind(this);
    this.finishLoad = this.finishLoad.bind(this);
  }

  componentWillMount() {
    const { watchForSize, id, name, image } = this.props;

    this.setState({
      loaded: false,
      loading: false,
    });

    watchForSize(image, id, name, document.querySelector('.column.gifs').scrollWidth);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.image.src.startsWith('https://gifs.')) {
      // Keep a handle to the larger image (gif), so we can cancel its load and events on it
      this.gif = nextProps.image;

      if (this.gif.complete) {
        this.finishLoad();
      } else {
        this.gif.addEventListener('load', this.finishLoad, { once: true });
      }
    }
  }

  componentWillUnmount() {
    const { image } = this.props;
    image.removeEventListener('load', this.finishLoad);

    if (this.gif) {
      console.log(`killing ${this.gif.src}`);
      this.gif.removeEventListener('load', this.finishLoad);
      this.gif.src = '//:0';
    }
  }

  startLoad() {
    this.setState({ loading: true });
  }

  finishLoad() {
    const { image } = this.props;

    this.setState({
      loaded: true,
      loading: false,
    });

    image.removeEventListener('load', this.finishLoad);
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
    src: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  watchForSize: PropTypes.func.isRequired,
};
