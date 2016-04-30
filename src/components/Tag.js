import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  addTagAsync,
  deleteTagAsync
} from '../actions/tags';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  addTagAsync,
  deleteTagAsync
};

class Tag extends Component {
  componentWillMount() {
    this.setState({ value: '' });
  }

  render() {
    const {
      content,
      meta,
      addTagAsync,  // eslint-disable-line no-shadow
      deleteTagAsync  // eslint-disable-line no-shadow
    } = this.props;

    const updateTagToAdd = (event) => { this.setState({ value: event.target.value }); };

    const tagInput = (
      <input
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        autoFocus
        className="tag-to-add"
        onChange={ updateTagToAdd }
        placeholder="Add tag"
        spellCheck="false"
        type="text"
        value={ this.state.value }
      ></input>
    );

    const deleteTag = () => { deleteTagAsync(content); };
    const addNewTag = () => {
      if (this.state.value) {
        addTagAsync(this.state.value);
      }
    };

    let addOrDel;

    if (meta === 'add-tag') {
      addOrDel = (
        <span>
          { tagInput }
          <span className="add-tag" onMouseUp={ addNewTag }><b>＋</b></span>
        </span>
      );
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
  content: PropTypes.string,
  meta: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tag);
