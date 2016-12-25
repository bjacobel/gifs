// @flow

import {
  GET_TAGS_SUCCEEDED,
  ADD_TAG_SUCCEEDED,
  DELETE_TAG_SUCCEEDED,
} from '../actions/tags';

const addToState = (state, newKey, newData) => {
  if (newKey in state) {
    return {
      ...state,
      [newKey]: state[newKey].concat(newData),
    };
  } else {
    return {
      ...state,
      [newKey]: newData,
    };
  }
};

export default (state = {}, action) => {
  switch (action.type) {
  case GET_TAGS_SUCCEEDED: {
    const tagMap = {};

    action.payload.tags.Items.forEach((tag) => {
      if (tagMap[tag.gif_id.S]) {
        tagMap[tag.gif_id.S].push({
          text: tag.tag.S,
          id: tag.id.S,
        });
      } else {
        tagMap[tag.gif_id.S] = [{
          text: tag.tag.S,
          id: tag.id.S,
        }];
      }
    });

    let buildState = state;

    Object.keys(tagMap).forEach((tagKey) => {
      buildState = addToState(buildState, tagKey, tagMap[tagKey]);
    });

    return buildState;
  }
  case ADD_TAG_SUCCEEDED: {
    const tag = action.payload.tagDocument;
    return addToState(state, tag.gif_id, [{ text: tag.tag, id: tag.id }]);
  }
  case DELETE_TAG_SUCCEEDED: {
    return {
      ...state,
      [action.payload.gifId]: state[action.payload.gifId].filter(x => x.id !== action.payload.tagId),
    };
  }
  default:
    return state;
  }
};
