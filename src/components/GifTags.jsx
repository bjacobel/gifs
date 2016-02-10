import React, { Component, PropTypes } from 'react';

export default class GifTags extends Component {
  render() {
    const { tags } = this.props;

    return (
      <div>
        { tags.map((tag) => {
          return (
            <span key={ tag.id }>{ tag.text }</span>
          );
        }) }
      </div>
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
