import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGifsAsync } from '../actions/gifs';
import GifGrid from './GifGrid';

function mapStateToProps(state) {
  return {
    gifs: state.gifs
  };
}

const mapDispatchToProps = {
  getGifsAsync
};

class Main extends Component {
  componentDidMount() {
    this.props.getGifsAsync();
  }

  render() {
    const { gifs } = this.props;

    return <GifGrid gifs={ gifs } />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
