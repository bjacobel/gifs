import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tag from './Tag';
import { getTagsAsync } from '../actions/tags';
import { ROOT_URL } from '../constants';
import { copy } from '../services/clipboard';

function mapStateToProps(state) {
  return {
    activeGif: state.activeGif,
    gifs: state.gifs,
    tags: state.tags,
  };
}

const mapDispatchToProps = {
  getTagsAsync,
};

class TagBox extends Component {
  componentWillMount() {
    this.props.getTagsAsync();
  }

  render() {
    const { gifs, tags } = this.props;
    const activeGifId = this.props.activeGif;
    const activeGif = gifs.find(gif => gif.id === activeGifId);

    let tagBoxContents;

    if (!activeGifId) {
      const tagValues = Object.values(tags);
      const flatTagList = [].concat(...tagValues);

      tagBoxContents = (
        <div>
          <p><i>{ gifs.length } gifs, { flatTagList.length } tags</i></p>
        </div>
      );
    } else {
      let tagList = null;

      if (tags[activeGifId]) {
        tagList = tags[activeGifId].map((tag) => {
          return (
            <Tag key={ tag.id } id={ tag.id } content={ tag.text } />
          );
        });
      }

      tagBoxContents = (
        <div>
          <input
            type="text"
            className="gif-fullname-hidden"
            value={ ROOT_URL + activeGif.src }
            readOnly
          />
          <p className="gif-name copy-icon" onMouseUp={ () => copy() }>
            <span className="sliding-ul-container">
              <span className="sliding-ul">
                <span className="lightgrey">{ ROOT_URL }</span>
                { activeGif.src }
              </span>
            </span>
          </p>
          <p className="tag-list">
            { tagList }
            <Tag className="adder" meta="add-tag" />
          </p>
        </div>
      );
    }

    return (
      <div className="tag-box">
        { tagBoxContents }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagBox);
