import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tag from './Tag';
import { getTagsAsync } from '../actions/tags';
import { getCognitoAuthAsync } from '../actions/auth';
import { rootURL } from '../constants';
import * as clipboard from '../services/clipboard';

function mapStateToProps(state) {
  return {
    activeGif: state.activeGif,
    gifs: state.gifs,
    tags: state.tags
  };
}

const mapDispatchToProps = {
  getTagsAsync,
  getCognitoAuthAsync
};

class TagBox extends Component {
  componentWillMount() {
    this.props.getCognitoAuthAsync();
    this.props.getTagsAsync();
  }

  render() {
    const { gifs, tags } = this.props;
    const activeGifId = this.props.activeGif;
    const activeGif = gifs.find(gif => gif.id === activeGifId);
    const clip = () => { clipboard.copy(rootURL + activeGif.src); };

    let tagBoxContents;

    if (!activeGifId) {
      const tagValues = Object.values(tags);
      const flatTagList = [].concat.apply([], tagValues);

      tagBoxContents = (
        <div>
          <p className="gif-name">Select a gif to begin</p>
          <p><i>{ gifs.length } gifs, { flatTagList.length } tags</i></p>
        </div>
      );
    } else {
      let tagList = null;

      if (tags.hasOwnProperty(activeGifId)) {
        tagList = tags[activeGifId].map((tag) => {
          return (
            <Tag key={ tag.id } id={ tag.id } content={ tag.text } />
          );
        });
      }

      tagBoxContents = (
        <div>
          <p className="gif-name copy-icon" onMouseUp={ clip }>
            <span className="sliding-ul">
              <span className="lightgrey">{ rootURL }</span>
              { activeGif.src }
            </span>
          </p>
          <p className="tag-list">
            { tagList }
            <Tag meta="add-tag" />
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
  mapDispatchToProps
)(TagBox);
