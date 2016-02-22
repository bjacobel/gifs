import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  incrementPage,
  decrementPage
} from '../actions/pagination';

const mapStateToProps = (state) => {
  const { gifs, tags, pageStart } = state;
  return { gifs, tags, pageStart };
};

const mapDispatchToProps = {
  incrementPage,
  decrementPage
};

class Pagination extends Component {
  render() {
    /* eslint-disable no-shadow */
    const {
      incrementPage,
      decrementPage
    } = this.props;
    /* eslint-enable no-shadow */

    return (
      <div className="pagination-controls">
        <button onClick={ decrementPage }>Prev Page</button>
        <button onClick={ incrementPage }>Next Page</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
