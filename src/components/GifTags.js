import React, { Component, PropTypes } from 'react';

import Tag from './Tag';

export default class GifTags extends Component {
  render() {
    const { tags } = this.props;

    return (
      <p className="tag-list">
        { tags.map((tag) => {
          return (
            <Tag key={ tag.id } content={ tag.text } />
          );
        }) }
        <Tag meta="add-tag" />
      </p>
    );
  }
}

GifTags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};
