import React, { Component } from 'react';
import { connect } from 'react-redux';

import { searchGifsAsync } from '../actions/search';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  searchGifsAsync,
};

class SearchBox extends Component {
  search(event) {
    this.props.searchGifsAsync(event.currentTarget.value);
  }

  render() {
    return (
      <div className="search-box">
        <input
          placeholder="Search"
          type="search"
          onChange={ event => this.search(event) }
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);
