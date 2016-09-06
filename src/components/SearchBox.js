import React, { Component } from 'react';
import { connect } from 'react-redux';

import { searchGifsAsync } from '../actions/search';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  searchGifsAsync
};

export default class SearchBox extends Component {
  search(event) {
    const { searchGifsAsync } = this.props;

    searchGifsAsync(event.currentTarget.value);
  }

  render() {
    return (
      <div className="search-box">
        <input
          placeholder="Search"
          onChange={ (event) => this.search(event) }
        ></input>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
