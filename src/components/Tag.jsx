import React, { Component, PropTypes } from 'react';

import Tag from './Tag';

export default class GifTags extends Component {
  render() {
    const { content, meta } = this.props;

    const deleteTag = () => {console.log('deleting tag');};
    const addNewTag = () => {console.log('adding tag');};

    let addOrDel;

    if (meta === 'add-tag') {
      addOrDel = <span className="add-tag" onMouseUp={ addNewTag }><b>＋</b></span>;
    } else {
      addOrDel = <span className="del-tag" onMouseUp={ deleteTag }>✕</span>;
    }


    return (
      <span>
        <span className="tag">
          { content }
          { addOrDel }
        </span>
        <span className="break"> </span>
      </span>
    );
  }
}

Tag.propTypes = {
  content: PropTypes.string.isRequired,
  meta: PropTypes.string
};
