import React, { Component } from 'react';
import { connect } from 'react-redux';

import GifWrapper from './GifWrapper';
import { pageSize } from '../constants';
import { getGifsAsync } from '../actions/gifs';
import { getTagsAsync } from '../actions/tags';

const mapStateToProps = (state) => {
  const { gifs, tags, pageStart } = state;
  return { gifs, tags, pageStart };
};

const mapDispatchToProps = {
  getGifsAsync,
  getTagsAsync
};

class GifGrid extends Component {
  componentDidMount() {
    /* eslint-disable no-shadow */
    const {
      getGifsAsync,
      getTagsAsync
    } = this.props;
    /* eslint-enable no-shadow */

    getGifsAsync();
    getTagsAsync();
  }

  render() {
    const { pageStart, gifs, tags } = this.props;

    return (
      <div>
        { gifs
          .slice(pageStart, pageStart + pageSize)
          .map((gif) => {
            return (
              <div className="gif" key={ gif.id }>
                <GifWrapper gif={ gif } tags={ tags[gif.id] || [] }/>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifGrid);
