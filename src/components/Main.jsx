import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGifsAsync } from '../actions/gifs';
import { getTagsAsync } from '../actions/tags';
import GifGrid from './GifGrid';

function mapStateToProps(state) {
  return {
    gifs: state.gifs,
    tags: state.tags
  };
}

const mapDispatchToProps = {
  getGifsAsync,
  getTagsAsync
};

class Main extends Component {
  componentDidMount() {
    this.props.getGifsAsync();
    this.props.getTagsAsync();
  }

  render() {
    const { gifs, tags } = this.props;

    return <GifGrid gifs={ gifs } tags={ tags }/>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
