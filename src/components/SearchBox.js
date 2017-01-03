import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { searchGifsAsync } from '../actions/search';

const mapStateToProps = state => ({
  searchIndex: state.searchIndex,
});

const mapDispatchToProps = {
  searchGifsAsync,
};

class SearchBox extends Component {
  search(event) {
    this.props.searchGifsAsync(event.currentTarget.value);
  }

  render() {
    const { initialSearch, searchIndex } = this.props;

    if (initialSearch && initialSearch.length > 1 && searchIndex) {
      this.props.searchGifsAsync(initialSearch);
    }

    return (
      <div className="search-box">
        <input
          placeholder="Search"
          type="search"
          onChange={ event => this.search(event) }
          ref={ (input) => {
            if (input && initialSearch && initialSearch.length > 1) {
              input.value = initialSearch;  // eslint-disable-line no-param-reassign
            }
          } }
        />
      </div>
    );
  }
}

SearchBox.propTypes = {
  initialSearch: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);
