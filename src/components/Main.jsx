import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getGifsAsync } from '../actions/gifs';
import GifGrid from './GifGrid';
import GifSearch from './GifSearch';

function mapStateToProps(state) {
  return {
    events: state.events
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

    return (
      <div>
        <GifSearch />
        <GifGrid gifs={ gifs } />
      </div>
    );
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
