import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import GifWrapper from './GifWrapper';
import { pageIncrement } from '../constants';
import { getGifsAsync } from '../actions/gifs';
import { getTagsAsync } from '../actions/tags';
import {
  incrementPageBoundary,
  decrementPageBoundary
} from '../actions/pageBoundary';

const mapStateToProps = (state) => {
  const { gifs, tags, pageBoundary } = state;
  return { gifs, tags, pageBoundary };
};

const mapDispatchToProps = {
  getGifsAsync,
  getTagsAsync,
  incrementPageBoundary,
  decrementPageBoundary
};

class GifGrid extends Component {
  componentDidMount() {
    this.props.getGifsAsync();
    this.props.getTagsAsync();

    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(() => {
      });
    });
  }

  render() {
    const { gifs, tags, pageBoundary } = this.props;

    const byTimestamp = (a, b) => {
      return a.date < b.date;
    };

    return (
      <div id="gif-grid">
        <div className="grid-sizer" />
        <div className="gutter-sizer" />
        { gifs
          .slice(pageBoundary - pageIncrement, pageBoundary)
          .sort(byTimestamp)
          .map((gif) => {
            return (
              <div className="packery-item" key={ gif.id }>
                <GifWrapper gif={ gif } tags={ tags[gif.id] || [] }/>
              </div>
            );
          })
        }
      </div>
    );
  }
}

GifGrid.propTypes = {
  gifs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  tags: PropTypes.shape().isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifGrid);
