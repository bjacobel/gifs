import React, { Component, PropTypes } from 'react';
import Infinite from 'react-infinite';
import { connect } from 'react-redux';

import GifWrapper from './GifWrapper';
import { getGifsAsync } from '../actions/gifs';

const mapStateToProps = (state) => {
  return {
    gifs: state.gifs,
    searchResults: state.searchResults,
  };
};

const mapDispatchToProps = {
  getGifsAsync,
};

class GifColumn extends Component {
  componentDidMount() {
    this.props.getGifsAsync();
  }

  render() {
    const { gifs, searchResults } = this.props;
    let filteredGifs = gifs;

    if (searchResults.length > 0) {
      filteredGifs = searchResults.map((result) => {
        return gifs.find(gif => result === gif.id);
      });
    }

    return (
      <Infinite
        className="gif-column"
        elementHeight={ filteredGifs.map(gif => gif.observedHeight || 400) }
        useWindowAsScrollContainer
      >
        { filteredGifs.map(gif => (
          <div className="gif" key={ gif.id + gif.src }>
            <GifWrapper gif={ gif } />
          </div>
        )) }
      </Infinite>
    );
  }
}

GifColumn.propTypes = {
  gifs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    observedHeight: PropTypes.number,
    src: PropTypes.string,
  })),
  searchResults: PropTypes.arrayOf(PropTypes.string),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GifColumn);
