import React, { Component, PropTypes } from 'react';
import Packery from 'packery';

import GifSwapper from './GifSwapper';

export default class GifGrid extends Component {
  // @TODO: Lazy loading, for now just murder the bowser by trying to load everything

  componentDidMount() {
    this.packerize = () => {
      new Packery(document.querySelector('#gif-grid'), {  // eslint-disable-line no-new
        itemSelector: '.packery-item',
        gutter: document.querySelector('.gutter-sizer'),
        columnWidth: document.querySelector('.grid-sizer'),
        percentPosition: true
      });
    };
    this.packerize();
  }

  componentDidUpdate() {
    this.packerize();
  }

  render() {
    const { gifs } = this.props;

    const byTimestamp = (a, b) => {
      return a.date < b.date;
    };

    return (
      <div id="gif-grid">
        <div className="grid-sizer" />
        <div className="gutter-sizer" />
        { gifs.sort(byTimestamp).map((gif) => {
          return (
            <div className="packery-item" key={ gif.id }>
              <GifSwapper gif={ gif } packerize={ this.packerize }/>
            </div>
          );
        }) }
      </div>
    );
  }
}

GifGrid.propTypes = {
  gifs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};
