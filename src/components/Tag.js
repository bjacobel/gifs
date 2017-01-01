import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {
  addTagAsync,
  deleteTagAsync,
} from '../actions/tags';
import { isAuthed } from '../services/auth0';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  addTagAsync,
  deleteTagAsync,
};

class Tag extends Component {
  componentWillMount() {
    this.setState({ value: '' });
  }

  render() {
    const {
      content,
      id,
      meta,
      /* eslint-disable no-shadow */
      addTagAsync,
      deleteTagAsync,
      /* eslint-enable no-shadow */
      auth,
    } = this.props;

    const updateTagToAdd = event => this.setState({ value: event.target.value });
    const deleteTag = () => deleteTagAsync(id);
    const addNewTag = () => {
      if (this.state.value) {
        addTagAsync(this.state.value);
        this.setState({ value: '' });
      }
    };
    const submitOnEnter = (event) => {
      if (event.nativeEvent.keyCode === 13) {
        addNewTag();
      }
    };

    const tagInput = (
      <input
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        autoFocus
        className="tag-to-add"
        onChange={ updateTagToAdd }
        onKeyPress={ submitOnEnter }
        placeholder="Add tag"
        spellCheck="false"
        type="text"
        value={ this.state.value }
        disabled={ !isAuthed(auth) }
      />
    );

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
      <span className={ classNames('tag-wrapper', { disabled: !isAuthed(auth), adder: meta === 'add-tag' }) }>
        <span className="tag">
          { content }
          { addOrDel }
        </span>
        { /* eslint-disable react/self-closing-comp */ }
        <span className="break"> </span>
        { /* eslint-enable react/self-closing-comp */ }
      </span>
    );
  }
}

Tag.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string,
  meta: PropTypes.oneOf(['add-tag', undefined]),
  auth: PropTypes.shape({
    idToken: PropTypes.string,
    idTokenExpiry: PropTypes.number,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tag);
