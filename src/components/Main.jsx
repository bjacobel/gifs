import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getGifsAsync } from '../actions/gifs';
import GifGrid from './GifGrid';

function mapStateToProps(state) {
  return {
    gifs: state.gifs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchGifGetter: () => dispatch(getGifsAsync())
  };
}

class Main extends Component {
  componentDidMount() {
    const { dispatchGifGetter } = this.props;
    dispatchGifGetter();
  }

  render() {
    const { gifs } = this.props;

    return <GifGrid gifs={ gifs } />;
  }
}

Main.propTypes = {
  dispatchGifGetter: PropTypes.func.isRequired,
  gifs: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
