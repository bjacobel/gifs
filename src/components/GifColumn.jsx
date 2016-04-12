import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactList from 'react-list';

import GifWrapper from './GifWrapper';
import { getGifsAsync } from '../actions/gifs';
import { getTagsAsync } from '../actions/tags';

const mapStateToProps = (state) => {
  const { gifs, tags } = state;
  return { gifs, tags };
};

const mapDispatchToProps = {
  getGifsAsync,
  getTagsAsync
};

class GifColumn extends Component {
  componentDidMount() {
    /* eslint-disable no-shadow */
    const {
      getGifsAsync,
      getTagsAsync
    } = this.props;
    /* eslint-enable no-shadow */

    getGifsAsync();
    getTagsAsync();

    this.renderGif = this.renderGif.bind(this);
  }

  renderGif(index) {
    const { gifs, tags } = this.props;
    const gif = gifs[index];

    return (
      <div className="gif" key={ gif.id }>
        <GifWrapper gif={ gif } tags={ tags[gif.id] || [] } />
      </div>
    );
  }

  render() {
    const { gifs } = this.props;

    return (
      <div className="gif-column">
        <ReactList
          itemRenderer={ this.renderGif }
          length={ gifs.length }
          pageSize={ 20 }
          type="variable"
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifColumn);
