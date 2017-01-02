import React, { Component, PropTypes } from 'react';

import GifColumn from './GifColumn';
import SearchBox from './SearchBox';
import LoginButton from './LoginButton';
import TagBox from './TagBox';

export default class Main extends Component {
  render() {
    const { params } = this.props;
    let search;

    if (params && params.search) {
      search = params.search;
    }

    return (
      <div>
        <div className="column-container">
          <div className="column gifs">
            <GifColumn />
          </div>
          <div className="column info">
            <div className="info-liner">
              <SearchBox initialSearch={ search } />
              <TagBox />
            </div>
          </div>
        </div>
        <LoginButton />
      </div>
    );
  }
}

Main.propTypes = {
  params: PropTypes.shape({
    search: PropTypes.string,
  }),
};
